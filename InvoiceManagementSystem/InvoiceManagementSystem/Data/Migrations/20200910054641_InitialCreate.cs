using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace InvoiceManagementSystem.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "NominalAccount",
                columns: table => new
                {
                    NominalAccountId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NominalAccountCode = table.Column<string>(nullable: true),
                    NominalAccountDisabled = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NominalAccount", x => x.NominalAccountId);
                });

            migrationBuilder.CreateTable(
                name: "PurchaseOrder",
                columns: table => new
                {
                    PurchaseOrderId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PurchaseOrderNumber = table.Column<string>(nullable: true),
                    PurchaseOrderAmountNet = table.Column<float>(nullable: false),
                    PurchaseOrderAmountTax = table.Column<float>(nullable: false),
                    PurchaseOrderAmountGross = table.Column<float>(nullable: false),
                    PurchaseOrderDisabled = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PurchaseOrder", x => x.PurchaseOrderId);
                });

            migrationBuilder.CreateTable(
                name: "Supplier",
                columns: table => new
                {
                    SupplierId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SupplierName = table.Column<string>(nullable: true),
                    SupplierCode = table.Column<string>(nullable: true),
                    SupplierDisabled = table.Column<string>(nullable: true),
                    NominalAccountId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Supplier", x => x.SupplierId);
                    table.ForeignKey(
                        name: "FK_Supplier_NominalAccount_NominalAccountId",
                        column: x => x.NominalAccountId,
                        principalTable: "NominalAccount",
                        principalColumn: "NominalAccountId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Invoice",
                columns: table => new
                {
                    InvoiceId = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InvoiceReference = table.Column<string>(nullable: true),
                    IssueDate = table.Column<DateTime>(nullable: false),
                    DueDate = table.Column<DateTime>(nullable: false),
                    AmountNet = table.Column<float>(nullable: false),
                    AmountTax = table.Column<float>(nullable: false),
                    AmountGross = table.Column<float>(nullable: false),
                    Status = table.Column<string>(nullable: true),
                    Description = table.Column<string>(nullable: true),
                    FilePath = table.Column<string>(nullable: true),
                    FileBody = table.Column<string>(nullable: true),
                    ModifiedBy = table.Column<string>(nullable: true),
                    ModifiedDate = table.Column<DateTime>(nullable: false),
                    PurchaseOrderId = table.Column<int>(nullable: false),
                    SupplierId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Invoice", x => x.InvoiceId);
                    table.ForeignKey(
                        name: "FK_Invoice_PurchaseOrder_PurchaseOrderId",
                        column: x => x.PurchaseOrderId,
                        principalTable: "PurchaseOrder",
                        principalColumn: "PurchaseOrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Invoice_Supplier_SupplierId",
                        column: x => x.SupplierId,
                        principalTable: "Supplier",
                        principalColumn: "SupplierId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_PurchaseOrderId",
                table: "Invoice",
                column: "PurchaseOrderId");

            migrationBuilder.CreateIndex(
                name: "IX_Invoice_SupplierId",
                table: "Invoice",
                column: "SupplierId");

            migrationBuilder.CreateIndex(
                name: "IX_Supplier_NominalAccountId",
                table: "Supplier",
                column: "NominalAccountId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Invoice");

            migrationBuilder.DropTable(
                name: "PurchaseOrder");

            migrationBuilder.DropTable(
                name: "Supplier");

            migrationBuilder.DropTable(
                name: "NominalAccount");
        }
    }
}
