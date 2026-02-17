using EmpBackend.Data;

public class Employee
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string NID { get; set; }
    public string Phone { get; set; }
    public string Department { get; set; }
    public decimal BasicSalary { get; set; }

    public Spouse? Spouse { get; set; }
    public ICollection<Child> Children { get; set; } = new List<Child>();
}
