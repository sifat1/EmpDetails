using AutoMapper;
using EmpBackend.Data;
using EmpBackend.Dtos.Employee;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EmpBackend.Controllers;

[ApiController]
[Route("api/employees")]
[Authorize]
public class EmployeesController : ControllerBase
{
    private readonly EmpDbContext _context;
    private readonly IMapper _mapper;

    public EmployeesController(EmpDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var employees = await _context.Employees
            .Include(e => e.Spouse)
            .Include(e => e.Children)
            .ToListAsync();

        var result = _mapper.Map<List<EmployeeResponseDto>>(employees);

        return Ok(result);
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<IActionResult> Create(EmployeeCreateDto dto)
    {
        var employee = _mapper.Map<Employee>(dto);

        _context.Employees.Add(employee);
        await _context.SaveChangesAsync();

        return Ok(_mapper.Map<EmployeeResponseDto>(employee));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(Guid id, EmployeeUpdateDto dto)
    {
        var employee = await _context.Employees
            .Include(e => e.Spouse)
            .Include(e => e.Children)
            .FirstOrDefaultAsync(e => e.Id == id);

        if (employee == null)
            return NotFound();

        _mapper.Map(dto, employee);

        await _context.SaveChangesAsync();

        return Ok(_mapper.Map<EmployeeResponseDto>(employee));
    }
}