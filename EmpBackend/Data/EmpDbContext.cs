using EmpBackend.Data;
using Microsoft.EntityFrameworkCore;

public class EmpDbContext : DbContext
{
    public EmpDbContext(DbContextOptions<EmpDbContext> options)
        : base(options) { }

    public DbSet<Employee> Employees => Set<Employee>();
    public DbSet<Spouse> Spouses => Set<Spouse>();
    public DbSet<Child> Children => Set<Child>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.Entity<Employee>()
            .HasIndex(e => e.NID)
            .IsUnique();

        builder.Entity<Employee>()
            .HasOne(e => e.Spouse)
            .WithOne(s => s.Employee)
            .HasForeignKey<Spouse>(s => s.EmployeeId);

        builder.Entity<Employee>()
            .HasMany(e => e.Children)
            .WithOne(c => c.Employee)
            .HasForeignKey(c => c.EmployeeId);
    }
}