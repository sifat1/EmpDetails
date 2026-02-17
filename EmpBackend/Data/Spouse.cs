namespace EmpBackend.Data;

public class Spouse
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string NID { get; set; }

    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; }
}
