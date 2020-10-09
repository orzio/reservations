using Microsoft.EntityFrameworkCore.Design;
using ProjectCalculator.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
namespace Reservations.Infrastructure
{
    public class BloggingContextFactory : IDesignTimeDbContextFactory<DataContext>
    {
        public DataContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<DataContext>();
            optionsBuilder.UseSqlServer("Data Source = (localdb)\\MSSQLLocalDB; Initial Catalog = TempDatabase");

            return new DataContext(optionsBuilder.Options);
        }
    }
}
