# 🏠 Home Viewing Booking System

A web-based real estate viewing appointment system that allows customers to browse properties, schedule property viewings, and manage their bookings. Sales staff can manage availability and handle viewing appointments.

---

## 1. Problem Statement & Objective

### Problem Statement

Traditional property viewing processes often rely on phone calls, messages, or manual coordination between customers and sales staff.

This creates several problems:

* Customers have difficulty finding suitable properties.
* Viewing schedules can overlap or be misunderstood.
* Sales staff need to manually track their availability.
* Booking status is difficult to monitor.
* There is no centralized history of booking activities.
* Customers may not receive timely updates about their appointments.

### Objective

The goal of this project is to build a simple and reliable **Property Viewing Booking System** that centralizes the process:

```text
Find Property
      ↓
Select Property
      ↓
Choose Viewing Time
      ↓
Create Booking
      ↓
Sale Confirms
      ↓
Customer Views Property
      ↓
Booking Completed
```

The Phase 1 MVP focuses on implementing the essential booking workflow before introducing more advanced features.

---

# 2. Feature Breakdown

## 2.1 Customer Features

### Authentication

* Register / Login
* Manage basic profile information

### Property Browsing

* View available properties
* Search properties
* Filter by:

  * City
  * District
  * Price
  * Area
  * Bedrooms
  * Property type

### Property Details

* View property information
* View description
* View images
* View price, area, bedrooms, and bathrooms

### Booking

* Select a property
* Select viewing date
* Select viewing time
* Add customer notes
* Create a viewing booking

### Booking Management

* View booking history
* View current booking status
* Cancel booking when applicable

### Notifications

* Receive booking confirmation
* Receive booking status updates

---

## 2.2 Sales Staff Features

### Authentication

* Login as Sales Staff

### Availability Management

* Define available working days
* Define available working hours

### Booking Management

* View assigned bookings
* Confirm bookings
* Reject bookings
* Update booking status
* Add notes about the viewing

### Customer Information

* View customer information related to a booking

---

## 2.3 Admin Features

### User Management

* Manage users
* Manage roles
* Activate / deactivate accounts

### Property Management

* Create properties
* Update properties
* Remove properties
* Manage property status
* Manage property images

### Booking Monitoring

* View all bookings
* Monitor booking statuses
* Review booking history

---

# 3. Selected Core Features (Phase 1 MVP)

To keep the first version focused and achievable, Phase 1 only implements the core booking workflow.

## Core Features

### 1. User & Role Management

Supported roles:

```text
ADMIN
SALE
CUSTOMER
```

Each user has a single role that determines their permissions.

---

### 2. Property Management

The system stores essential property information:

* Property title
* Description
* Property type
* Address
* District
* City
* Price
* Area
* Bedrooms
* Bathrooms
* Availability status
* Property images

---

### 3. Property Search & Filtering

Customers can find properties using basic criteria:

```text
Location
Price
Area
Bedrooms
Property Type
```

Example:

```text
"Căn hộ 2 phòng ngủ ở Cầu Giấy dưới 5 tỷ"
```

The system converts these requirements into database filters.

---

### 4. Viewing Booking

Customers can create a viewing appointment by selecting:

```text
Property
Date
Start Time
End Time
Customer Note
```

The booking is initially created with:

```text
PENDING
```

---

### 5. Sales Availability

Sales staff define when they are available.

Example:

```text
Monday
08:00 - 12:00
13:30 - 17:30
```

The system uses this information when handling viewing appointments.

---

### 6. Booking Status Management

The Phase 1 booking lifecycle is:

```text
PENDING
   │
   ├──→ CONFIRMED
   │       │
   │       └──→ COMPLETED
   │
   └──→ REJECTED

PENDING / CONFIRMED
        │
        └──→ CANCELLED
```

This provides a clear and traceable booking workflow.

---

### 7. Booking History

Every important status change is recorded.

Example:

```text
PENDING
    ↓
CONFIRMED
    ↓
COMPLETED
```

The system records:

* Previous status
* New status
* Who changed it
* Reason
* Timestamp

---

### 8. Notifications

Users receive notifications for important booking events:

* Booking created
* Booking confirmed
* Booking rejected
* Booking cancelled
* Booking completed

---

# 4. Database Architecture & Detailed ERD

## 4.1 Database Architecture

The system uses a relational database design based on **MySQL 8.0+ / MariaDB**.

The database is organized into four main domains:

```text
HOME BOOKING SYSTEM
│
├── User Management
│   ├── roles
│   ├── users
│   ├── customer_profiles
│   └── sale_profiles
│
├── Property Management
│   ├── properties
│   └── property_media
│
├── Schedule Management
│   └── sale_availability
│
└── Booking Management
    ├── bookings
    ├── booking_status_history
    └── notifications
```

---

## 4.2 Database Tables

| Table                    | Responsibility                       |
| ------------------------ | ------------------------------------ |
| `roles`                  | Stores system roles                  |
| `users`                  | Stores user accounts                 |
| `customer_profiles`      | Stores customer-specific information |
| `sale_profiles`          | Stores sales staff information       |
| `properties`             | Stores property information          |
| `property_media`         | Stores property images/media         |
| `sale_availability`      | Stores sales staff availability      |
| `bookings`               | Stores property viewing appointments |
| `booking_status_history` | Stores booking status changes        |
| `notifications`          | Stores user notifications            |

---

## 4.3 Core Relationships

```text
roles
  │
  │ 1:N
  ▼
users
  │
  ├───────────────┐
  │               │
  │ 1:1           │ 1:1
  ▼               ▼
customer_profiles sale_profiles
                    │
                    │ 1:N
                    ▼
             sale_availability


users ───────────────┐
 │                    │
 │                    │
 │              ┌─────┴─────┐
 │              │  bookings │
 │              └─────┬─────┘
 │                    │
 │                    │ N:1
 │                    ▼
 │                properties
 │                    │
 │                    │ 1:N
 │                    ▼
 │              property_media
 │
 └── booking_status_history
 └── notifications
```

---

## 4.4 Entity Relationship Overview

### `roles`

Stores the available roles:

```text
ADMIN
SALE
CUSTOMER
```

### `users`

Stores common authentication and account information.

```text
users
 ├── role_id → roles.id
 └── user information
```

### `customer_profiles`

Stores additional information specific to customers.

```text
customer_profiles
 └── user_id → users.id
```

### `sale_profiles`

Stores additional information specific to sales staff.

```text
sale_profiles
 └── user_id → users.id
```

### `properties`

Stores the properties available for viewing.

```text
properties
 └── created_by → users.id
```

### `property_media`

Stores multiple images/media for each property.

```text
property_media
 └── property_id → properties.id
```

### `sale_availability`

Stores the working availability of sales staff.

```text
sale_availability
 └── sale_id → users.id
```

### `bookings`

The central table connecting:

```text
Customer
    +
Property
    +
Sale
    +
Viewing Schedule
```

Relationships:

```text
bookings.customer_id → users.id
bookings.property_id → properties.id
bookings.sale_id → users.id
```

### `booking_status_history`

Stores the history of booking status changes.

```text
booking_status_history
 └── booking_id → bookings.id
```

### `notifications`

Stores notifications associated with users and booking events.

```text
notifications
 └── user_id → users.id
```

---

## 4.5 Detailed ERD

The detailed ERD is maintained separately using the database design/ERD tool.

Recommended structure:

```text
┌────────────┐
│   roles    │
└─────┬──────┘
      │
      │ 1:N
      ▼
┌────────────┐
│   users    │
└─────┬──────┘
      │
      ├──────────────┐
      │              │
      ▼              ▼
┌─────────────┐ ┌──────────────┐
│  customer   │ │    sale      │
│  profiles   │ │   profiles   │
└─────────────┘ └──────┬───────┘
                       │
                       ▼
                ┌───────────────┐
                │     sale      │
                │ availability  │
                └───────────────┘

┌──────────────┐
│  properties  │
└──────┬───────┘
       │
       │ 1:N
       ▼
┌────────────────┐
│ property_media │
└────────────────┘

┌──────────────┐
│   bookings   │
└──────┬───────┘
       │
       ├────────────── Customer
       │
       ├────────────── Property
       │
       └────────────── Sale
       │
       ├────────────── booking_status_history
       │
       └────────────── notifications
```

> **ERD Source:** MySQL database schema in `home_booking`.

---

# 5. Interactive Frontend Prototype

The frontend prototype focuses on providing a simple and intuitive booking experience.

## 5.1 Customer Flow

```text
Home
  ↓
Property Search
  ↓
Property List
  ↓
Property Details
  ↓
Select Viewing Date & Time
  ↓
Booking Confirmation
  ↓
Booking Status
```

---

## 5.2 Main Customer Screens

### Home / Property Search

The customer can:

* Search for properties
* Filter properties
* Browse available properties

Example:

```text
Search: Căn hộ Cầu Giấy

Filters:
Price: < 5 tỷ
Bedrooms: >= 2
Area: >= 70 m²
```

---

### Property Listing

Displays:

* Property image
* Property title
* Location
* Price
* Area
* Bedrooms
* Main action: `View Details`

---

### Property Details

Displays:

* Property images
* Property title
* Address
* Price
* Area
* Bedrooms
* Bathrooms
* Description

Main action:

```text
[ Book a Viewing ]
```

---

### Booking Screen

Customer selects:

```text
Date
Start Time
End Time
Note
```

Then:

```text
[ Confirm Booking ]
```

---

### Booking Status

Customer can see:

```text
Booking #001

Property:
Vinhomes D'Capitale

Date:
15/09/2026

Time:
09:00 - 10:00

Status:
PENDING
```

---

## 5.3 Sales Dashboard

Sales staff can see:

```text
Today's Schedule

09:00 - 10:00
Căn hộ Vinhomes D'Capitale
Customer: Phạm Quang Minh
Status: PENDING

14:00 - 15:00
Royal City
Customer: Hoàng Ngọc Lan
Status: CONFIRMED
```

Available actions:

```text
[ Confirm ]
[ Reject ]
[ Complete ]
```

---

## 5.4 UI/UX Principles

The prototype follows several basic principles:

### Simplicity

The customer should be able to go from:

```text
Search → Property → Book
```

with minimal steps.

### Clear Status

Booking status should always be visually understandable:

```text
PENDING
CONFIRMED
REJECTED
CANCELLED
COMPLETED
```

### Mobile-Friendly

The customer booking flow should work well on both desktop and mobile screens.

### Consistency

Buttons, forms, cards, status indicators, and navigation should follow a consistent design system.

---

# 6. Phase 1 MVP Scope

The first release focuses on:

```text
┌────────────────────────────────────┐
│       PHASE 1 MVP                  │
├────────────────────────────────────┤
│ User Authentication                │
│ Property Browsing                  │
│ Property Search & Filtering        │
│ Property Details                   │
│ Viewing Booking                    │
│ Sale Availability                  │
│ Booking Status Management          │
│ Booking History                    │
│ Notifications                      │
└────────────────────────────────────┘
```

Features intentionally excluded from Phase 1:

* AI Agent
* Automatic Sale ranking
* Route optimization
* Automatic rescheduling
* Advanced recommendation
* Calendar synchronization
* Customer behavioral analytics
* Advanced evaluation system

These features can be considered in later phases after the core booking workflow is stable.

---

# 7. Core System Workflow

The complete Phase 1 workflow is:

```text
Customer
   │
   ▼
Search Property
   │
   ▼
View Property Details
   │
   ▼
Select Date & Time
   │
   ▼
Create Booking
   │
   ▼
PENDING
   │
   ▼
Sale Reviews Booking
   │
   ├───────────────┐
   │               │
   ▼               ▼
CONFIRMED       REJECTED
   │
   ▼
Property Viewing
   │
   ▼
COMPLETED
```

---

# 8. Technology Stack

### Backend

* MySQL 8.0+ / MariaDB
* REST API
* Authentication & Role-Based Access Control

### Frontend

* React
* TypeScript
* Responsive UI

### Database

* Relational database
* Foreign Key constraints
* Indexed search fields
* Transactional booking data

### Development Tools

* Git / GitHub
* Navicat
* Database ERD / DBML documentation

---

# 9. Project Goal

The primary goal of Phase 1 is not to build a highly complex real estate platform.

Instead, the goal is to build a **clean, functional, and extensible foundation** for the property viewing booking process.

The system should first solve:

> **"A customer wants to view a property. How can the system reliably create, manage, confirm, and track that viewing appointment?"**

Once this workflow is stable, more advanced features can be introduced without unnecessarily complicating the MVP.
