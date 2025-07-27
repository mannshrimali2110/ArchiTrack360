### **Object-Oriented Design Concepts**

This section outlines the key classes, their primary responsibilities (methods), and their collaborative relationships (attributes) within the project.

**1. Project Management Domain**

* **Class: `Project`**
    * **Responsibilities:**
        * `storeMetadata(name, deadline, budget)`: Stores essential project details.
        * `manageTaskRelationships()`: Handles the associations between tasks within the project.
        * `trackCompletionPercentage()`: Calculates and updates the project's progress.
        * `enforceBudgetConstraints()`: Ensures spending remains within allocated limits.
    * **Collaborators (Attributes/Associations):**
        * `List<Task> tasks`
        * `Budget budget`
        * `List<Resource> resources`
        * `ProjectArchive archive` (for archiving)

* **Class: `Task`**
    * **Responsibilities:**
        * `assignTeamMembers(List<Resource> members)`: Assigns resources to the task.
        * `trackStatus(status: Enum)`: Updates the status (e.g., Not Started, In Progress, Done).
        * `calculateDuration()`: Determines the time taken or expected for the task.
    * **Collaborators (Attributes/Associations):**
        * `Project parentProject`
        * `List<Resource> assignedResources`

* **Class: `ProjectArchive`**
    * **Responsibilities:**
        * `storeDeletedProjectData(Project project)`: Persists information for projects that are no longer active.
        * `maintainAuditTrails()`: Records changes and activities for compliance.
        * `supportRestoration()`: Facilitates the retrieval of archived project data.
    * **Collaborators (Attributes/Associations):**
        * `List<Project> archivedProjects`

* **Class: `Resource`**
    * **Responsibilities:**
        * `storeTeamMemberSkills(List<String> skills)`: Records the abilities of team members.
        * `trackAvailability()`: Manages the availability status of resources.
    * **Collaborators (Attributes/Associations):**
        * `List<Project> assignedProjects`
        * `List<Task> assignedTasks`

**2. Financial Management Domain**

* **Class: `Budget`**
    * **Responsibilities:**
        * `setSpendingLimits(limits: Map<String, Double>)`: Defines financial boundaries for categories.
        * `trackExpenditures(amount: Double, category: String)`: Monitors and records money spent.
    * **Collaborators (Attributes/Associations):**
        * `FinanceReport financeReport`
        * `List<Expense> expenses` (implicitly managed through tracking)

* **Class: `Expenses`**
    * **Responsibilities:**
        * `recordPayments(paymentDetails: Payment)`: Logs details of financial transactions.
        * `categorizeCosts(costType: Enum)`: Assigns costs to predefined categories.
    * **Collaborators (Attributes/Associations):**
        * `Budget associatedBudget`
        * `Vendor vendor` (if applicable for vendor payments)

* **Class: `FinanceReport`**
    * **Responsibilities:**
        * `generateStatements()`: Creates financial summaries.
        * `highlightVariances()`: Identifies significant deviations from the budget.
        * `createReports()`: Compiles various financial reports.
    * **Collaborators (Attributes/Associations):**
        * `Budget budgetData`
        * `List<Expenses> expenseData`

* **Class: `Vendor`**
    * **Responsibilities:**
        * `storePaymentTerms(terms: String)`: Records the agreed payment conditions.
        * `trackInvoiceHistory(invoice: Invoice)`: Maintains a log of invoices from the vendor.
    * **Collaborators (Attributes/Associations):**
        * `List<Budget> relevantBudgets`
        * `List<Expenses> associatedExpenses`

**3. Inventory & Asset Management Domain**

* **Class: `Material`**
    * **Responsibilities:**
        * `trackCurrentStockLevels()`: Monitors the quantity of materials on hand.
        * `manageReorderThresholds()`: Sets and manages levels for reordering.
        * `validateSupplierQualifications(supplier: Supplier)`: Checks if a supplier meets required criteria.
    * **Collaborators (Attributes/Associations):**
        * `Order order`
        * `Resource relatedResource` (if material is part of a resource)
        * `InventoryAlert inventoryAlert` (for low stock)

* **Class: `Equipment`**
    * **Responsibilities:**
        * `logUsageHours(hours: Double)`: Records the operational time of equipment.
        * `scheduleMaintenance(MaintenanceSchedule schedule)`: Integrates with maintenance planning.
        * `trackDepreciation()`: Calculates the decrease in value over time.
        * `manageCheckInOut()`: Handles the allocation and return of equipment.
    * **Collaborators (Attributes/Associations):**
        * `InventoryAlert inventoryAlert`
        * `MaintenanceSchedule maintenanceSchedule`

* **Class: `MaintenanceSchedule`**
    * **Responsibilities:**
        * `planServiceIntervals()`: Defines when maintenance should occur.
        * `assignTechnicians(List<Resource> technicians)`: Allocates personnel for maintenance tasks.
    * **Collaborators (Attributes/Associations):**
        * `Equipment equipment` (for which maintenance is scheduled)

* **Class: `Order`**
    * **Responsibilities:**
        * `processMaterialRequests(request: MaterialRequest)`: Handles requests for materials.
        * `validateQuantities(quantity: Double)`: Ensures ordered quantities are correct.
    * **Collaborators (Attributes/Associations):**
        * `Material orderedMaterial`
        * `Equipment orderedEquipment`
        * `Resource requestedResource`

* **Class: `InventoryAlert`**
    * **Responsibilities:**
        * `monitorThresholdBreaches()`: Detects when stock or usage levels cross defined limits.
        * `notifyManagers(message: String)`: Informs relevant personnel about alerts.
    * **Collaborators (Attributes/Associations):**
        * `Material material` (associated with the alert)
        * `Equipment equipment` (associated with the alert)

---