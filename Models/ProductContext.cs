using System;
using Microsoft.EntityFrameworkCore;

namespace adminPage.Models
{
    public class ProductContext: DbContext
    {
        public ProductContext(DbContextOptions<ProductContext> options) : base(options)
        {
        }
        public DbSet<Product> Users { get; set; }
       

    }
}
