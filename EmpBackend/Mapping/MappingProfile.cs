using AutoMapper;
using EmpBackend.Data;
using EmpBackend.Dtos.Employee;

namespace EmpBackend.Mapping;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<EmployeeCreateDto, Employee>();
        CreateMap<EmployeeUpdateDto, Employee>();

        CreateMap<Employee, EmployeeResponseDto>();

        CreateMap<SpouseDto, Spouse>();
        CreateMap<Spouse, SpouseDto>();

        CreateMap<ChildDto, Child>();
        CreateMap<Child, ChildDto>();
    }
}