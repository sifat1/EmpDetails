public class Child
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public DateTime DoB { get; set; }

    public Guid EmployeeId { get; set; }
    public Employee Employee { get; set; }
}
