using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace ArrivedAPI.Models
{
    public partial class arrivedContext : DbContext
    {
        public arrivedContext()
        {
        }

        public arrivedContext(DbContextOptions<arrivedContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Accounts> Accounts { get; set; }
        public virtual DbSet<AccountsAccounts> AccountsAccounts { get; set; }
        public virtual DbSet<AccountsBracelets> AccountsBracelets { get; set; }
        public virtual DbSet<Bracelets> Bracelets { get; set; }
        public virtual DbSet<Externals> Externals { get; set; }
        public virtual DbSet<Places> Places { get; set; }
        public virtual DbSet<Travels> Travels { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=admin;password=test;database=arrived");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Accounts>(entity =>
            {
                entity.HasKey(e => e.IdAccount)
                    .HasName("PRIMARY");

                entity.ToTable("accounts");

                entity.Property(e => e.IdAccount)
                    .HasColumnName("id_account")
                    .HasColumnType("int(11)");

                entity.Property(e => e.EmailAccount)
                    .IsRequired()
                    .HasColumnName("email_account")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.NameAccount)
                    .IsRequired()
                    .HasColumnName("name_account")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.PasswordAccount)
                    .IsRequired()
                    .HasColumnName("password_account")
                    .HasColumnType("varchar(16)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.PhonenumberAccount)
                    .IsRequired()
                    .HasColumnName("phonenumber_account")
                    .HasColumnType("varchar(12)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.SurnameAccount)
                    .IsRequired()
                    .HasColumnName("surname_account")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
            });

            modelBuilder.Entity<AccountsAccounts>(entity =>
            {
                entity.HasKey(e => new { e.IdAccountFollower, e.IdAccountFollowed })
                    .HasName("PRIMARY");

                entity.ToTable("accounts_accounts");

                entity.HasIndex(e => e.IdAccountFollowed)
                    .HasName("id_account_followed");

                entity.Property(e => e.IdAccountFollower)
                    .HasColumnName("id_account_follower")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdAccountFollowed)
                    .HasColumnName("id_account_followed")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdAccountFollowedNavigation)
                    .WithMany(p => p.AccountsAccountsIdAccountFollowedNavigation)
                    .HasForeignKey(d => d.IdAccountFollowed)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("accounts_accounts_ibfk_2");

                entity.HasOne(d => d.IdAccountFollowerNavigation)
                    .WithMany(p => p.AccountsAccountsIdAccountFollowerNavigation)
                    .HasForeignKey(d => d.IdAccountFollower)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("accounts_accounts_ibfk_1");
            });

            modelBuilder.Entity<AccountsBracelets>(entity =>
            {
                entity.HasKey(e => new { e.IdAccountBracelet, e.IdBraceletAccount })
                    .HasName("PRIMARY");

                entity.ToTable("accounts_bracelets");

                entity.HasIndex(e => e.IdBraceletAccount)
                    .HasName("id_bracelet_account");

                entity.Property(e => e.IdAccountBracelet)
                    .HasColumnName("id_account_bracelet")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdBraceletAccount)
                    .HasColumnName("id_bracelet_account")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdAccountBraceletNavigation)
                    .WithMany(p => p.AccountsBracelets)
                    .HasForeignKey(d => d.IdAccountBracelet)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("accounts_bracelets_ibfk_1");

                entity.HasOne(d => d.IdBraceletAccountNavigation)
                    .WithMany(p => p.AccountsBracelets)
                    .HasForeignKey(d => d.IdBraceletAccount)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("accounts_bracelets_ibfk_2");
            });

            modelBuilder.Entity<Bracelets>(entity =>
            {
                entity.HasKey(e => e.IdBracelet)
                    .HasName("PRIMARY");

                entity.ToTable("bracelets");

                entity.Property(e => e.IdBracelet)
                    .HasColumnName("id_bracelet")
                    .HasColumnType("int(11)");

                entity.Property(e => e.MaterialidBracelet)
                    .HasColumnName("materialid_bracelet")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NameBracelet)
                    .IsRequired()
                    .HasColumnName("name_bracelet")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.SurnameBracelet)
                    .IsRequired()
                    .HasColumnName("surname_bracelet")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
            });

            modelBuilder.Entity<Externals>(entity =>
            {
                entity.HasKey(e => e.IdExternal)
                    .HasName("PRIMARY");

                entity.ToTable("externals");

                entity.HasIndex(e => e.IdaccountExternals)
                    .HasName("idaccount_externals");

                entity.Property(e => e.IdExternal)
                    .HasColumnName("id_external")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdaccountExternals)
                    .HasColumnName("idaccount_externals")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NameExternal)
                    .IsRequired()
                    .HasColumnName("name_external")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.PhonenumberExternal)
                    .IsRequired()
                    .HasColumnName("phonenumber_external")
                    .HasColumnType("varchar(12)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.SurnameExternal)
                    .IsRequired()
                    .HasColumnName("surname_external")
                    .HasColumnType("varchar(32)")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.HasOne(d => d.IdaccountExternalsNavigation)
                    .WithMany(p => p.Externals)
                    .HasForeignKey(d => d.IdaccountExternals)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("externals_ibfk_1");
            });

            modelBuilder.Entity<Places>(entity =>
            {
                entity.HasKey(e => e.IdPlace)
                    .HasName("PRIMARY");

                entity.ToTable("places");

                entity.HasIndex(e => e.IdaccountPlace)
                    .HasName("idaccount_place");

                entity.HasIndex(e => e.IdbraceletPlace)
                    .HasName("idbracelet_place");

                entity.Property(e => e.IdPlace)
                    .HasColumnName("id_place")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdaccountPlace)
                    .HasColumnName("idaccount_place")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdbraceletPlace)
                    .HasColumnName("idbracelet_place")
                    .HasColumnType("int(11)");

                entity.Property(e => e.LatitudePlace)
                    .HasColumnName("latitude_place")
                    .HasColumnType("int(11)");

                entity.Property(e => e.LongitudePlace)
                    .HasColumnName("longitude_place")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NamePlace)
                    .HasColumnName("name_place")
                    .HasColumnType("varchar(32)")
                    .HasDefaultValueSql("'NULL'")
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.HasOne(d => d.IdaccountPlaceNavigation)
                    .WithMany(p => p.Places)
                    .HasForeignKey(d => d.IdaccountPlace)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("places_ibfk_2");

                entity.HasOne(d => d.IdbraceletPlaceNavigation)
                    .WithMany(p => p.Places)
                    .HasForeignKey(d => d.IdbraceletPlace)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("places_ibfk_1");
            });

            modelBuilder.Entity<Travels>(entity =>
            {
                entity.HasKey(e => e.IdTravel)
                    .HasName("PRIMARY");

                entity.ToTable("travels");

                entity.HasIndex(e => e.IdaccountTravel)
                    .HasName("idaccount_travel");

                entity.HasIndex(e => e.IdbraceletTravel)
                    .HasName("idbracelet_travel");

                entity.HasIndex(e => e.IdendTravel)
                    .HasName("idend_travel");

                entity.HasIndex(e => e.IdstartTravel)
                    .HasName("idstart_travel");

                entity.Property(e => e.IdTravel)
                    .HasColumnName("id_travel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdaccountTravel)
                    .HasColumnName("idaccount_travel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdbraceletTravel)
                    .HasColumnName("idbracelet_travel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdendTravel)
                    .HasColumnName("idend_travel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.IdstartTravel)
                    .HasColumnName("idstart_travel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.NameTravel)
                    .HasColumnName("name_travel")
                    .HasColumnType("int(11)");

                entity.Property(e => e.TimeTravel)
                    .HasColumnName("time_travel")
                    .HasColumnType("int(11)");

                entity.HasOne(d => d.IdaccountTravelNavigation)
                    .WithMany(p => p.Travels)
                    .HasForeignKey(d => d.IdaccountTravel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("travels_ibfk_3");

                entity.HasOne(d => d.IdbraceletTravelNavigation)
                    .WithMany(p => p.Travels)
                    .HasForeignKey(d => d.IdbraceletTravel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("travels_ibfk_4");

                entity.HasOne(d => d.IdendTravelNavigation)
                    .WithMany(p => p.TravelsIdendTravelNavigation)
                    .HasForeignKey(d => d.IdendTravel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("travels_ibfk_2");

                entity.HasOne(d => d.IdstartTravelNavigation)
                    .WithMany(p => p.TravelsIdstartTravelNavigation)
                    .HasForeignKey(d => d.IdstartTravel)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("travels_ibfk_1");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
