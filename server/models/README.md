# MongoDB Models and Their Relationships

This document outlines the MongoDB models used in the application, their relationships, and the flow of data between them.

## Models Overview

### 1. User
- **File**: `User.js`
- **Fields**:
  - `email`: Unique identifier for the user.
  - `password`: Encrypted password for authentication.
- **Purpose**: Represents the users of the application.

### 2. Supplier
- **File**: `Supplier.js`
- **Fields**:
  - `supplierName`, `phone`, `email`, `address`, `supplyProducts`, `paymentTerms`: Details about the supplier.
  - `userId`: References the `User` model for user-specific access.
- **Purpose**: Stores information about suppliers linked to specific users.

### 3. Sales
- **File**: `sales.js`
- **Fields**:
  - `customerName`, `productName`, `quantity`, `price`, `date`: Details about a sale.
  - `userId`: References the `User` model for associating sales with a user.
- **Purpose**: Tracks sales data for users.

### 4. Orders
- **File**: `orders.js`
- **Fields**:
  - `customerName`, `productName`, `quantity`, `price`, `date`: Details about an order.
  - `ownerID`: References the `User` model for user-based access.
- **Purpose**: Manages orders placed by users.

### 5. InventoryItem
- **File**: `InventoryItem.js`
- **Fields**:
  - `name`, `quantity`, `price`, `date`: Details about inventory items.
  - `userId`: References the `User` model for associating inventory items with a user.
- **Purpose**: Maintains inventory data for users.

### 6. Employee
- **File**: `employeeModel.js`
- **Fields**:
  - `name`, `department`, `email`, `date`: Details about employees.
  - `createdBy`: References the `User` model to track which user created the employee record.
- **Purpose**: Stores employee information linked to specific users.

## Relationships Between Models

1. **User and Supplier**:
   - A `Supplier` is linked to a `User` through the `userId` field.
   - This ensures that suppliers are managed on a per-user basis.

2. **User and Sales**:
   - A `Sale` is associated with a `User` via the `userId` field.
   - This allows tracking of sales data for individual users.

3. **User and Orders**:
   - An `Order` is linked to a `User` through the `ownerID` field.
   - This ensures that orders are user-specific.

4. **User and InventoryItem**:
   - An `InventoryItem` is associated with a `User` via the `userId` field.
   - This allows inventory management on a per-user basis.

5. **User and Employee**:
   - An `Employee` is linked to a `User` through the `createdBy` field.
   - This ensures that employee records are tied to the user who created them.

## Data Flow

1. **User Creation**:
   - A `User` is created with an email and password.
   - Other models reference the `User` model to ensure data is user-specific.

2. **Supplier Management**:
   - Users can add suppliers, which are linked to their account via the `userId` field.

3. **Sales Tracking**:
   - Sales data is recorded for each user, ensuring that users can only access their own sales records.

4. **Order Management**:
   - Orders are created and linked to users, ensuring user-specific access.

5. **Inventory Management**:
   - Inventory items are added and managed by users, with each item linked to a specific user.

6. **Employee Records**:
   - Employees are added by users and linked to the user who created the record.

## Summary

The application uses a user-centric design where all models are linked to the `User` model. This ensures that data is isolated and managed on a per-user basis, providing a secure and organized structure for the application.