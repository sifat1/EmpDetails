namespace EmpBackend.Data;

public static class SeedData
{
    public static void Seed(EmpDbContext context)
    {
        if (context.Employees.Any()) return;

        var employees = new List<Employee>
        {
            new Employee { Id=Guid.NewGuid(), Name="Tanvir Hasan", NID="1234567890", Phone="+8801711111111", Department="IT", BasicSalary=50000 },
            new Employee { Id=Guid.NewGuid(), Name="Moushumi Akter", NID="12345678901234567", Phone="01722222222", Department="HR", BasicSalary=45000 },
            new Employee { Id=Guid.NewGuid(), Name="Rakib Hossain", NID="2234567890", Phone="+8801733333333", Department="Finance", BasicSalary=48000 },
            new Employee { Id=Guid.NewGuid(), Name="Nusrat Jahan", NID="3234567890", Phone="01744444444", Department="Admin", BasicSalary=42000 },
            new Employee { Id=Guid.NewGuid(), Name="Siam Ahmed", NID="4234567890", Phone="+8801755555555", Department="IT", BasicSalary=52000 },
            new Employee { Id=Guid.NewGuid(), Name="Farhana Rahman", NID="5234567890", Phone="01766666666", Department="Marketing", BasicSalary=46000 },
            new Employee { Id=Guid.NewGuid(), Name="Arif Khan", NID="6234567890", Phone="+8801777777777", Department="Finance", BasicSalary=49000 },
            new Employee { Id=Guid.NewGuid(), Name="Tania Sultana", NID="7234567890", Phone="01788888888", Department="HR", BasicSalary=43000 },
            new Employee { Id=Guid.NewGuid(), Name="Mahmudul Hasan", NID="8234567890", Phone="+8801799999999", Department="IT", BasicSalary=55000 },
            new Employee { Id=Guid.NewGuid(), Name="Rima Chowdhury", NID="9234567890", Phone="01700000000", Department="Admin", BasicSalary=41000 }
        };

        context.Employees.AddRange(employees);
        context.SaveChanges();
    }
}
