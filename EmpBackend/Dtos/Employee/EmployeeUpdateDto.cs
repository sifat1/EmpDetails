namespace EmpBackend.Dtos.Employee;

public class EmployeeUpdateDto
{
    public string Name { get; set; }
    public string Phone { get; set; }
    public string Department { get; set; }
    public decimal BasicSalary { get; set; }

    public SpouseDto? Spouse { get; set; }
    public List<ChildDto>? Children { get; set; }
}
