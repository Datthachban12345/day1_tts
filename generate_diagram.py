import urllib.request

puml = """@startuml
!include https://raw.githubusercontent.com/plantuml-stdlib/C4-PlantUML/master/C4_Container.puml

LAYOUT_WITH_LEGEND()

title Container diagram for Home Viewing Booking System

Person(customer, "Customer", "Searches properties, schedules and manages viewing appointments.")
Person(sales, "Sales Staff", "Manages personal availability, reviews and updates viewing bookings.")
Person(admin, "Administrator", "Manages users, roles, properties, and system-wide configurations.")

System_Boundary(c1, "Home Viewing Booking System") {
    Container(spa, "Single-Page Application", "React, TypeScript, Vite", "Delivers property browsing, booking forms, schedule calendar, and administrative dashboards.")
    Container(api, "API Application", "Node.js (Express / NestJS)", "Provides business logic, authentication, booking workflows, permission checks, and data validation via REST API.")
    ContainerDb(db, "Database", "MySQL 8 / MariaDB", "Stores user accounts, property listings, sales schedules, viewing bookings, and status history.")
}

System_Ext(email_sys, "E-mail System", "SendGrid / Resend / SMTP", "Delivers transactional emails (booking confirmations, status updates, and new booking alerts).")
System_Ext(media_store, "Cloud Media Storage", "Cloudinary / AWS S3", "Hosts and delivers property photos and media assets.")

Rel(customer, spa, "Visits & interacts with", "HTTPS")
Rel(sales, spa, "Manages bookings & availability in", "HTTPS")
Rel(admin, spa, "Manages system data in", "HTTPS")

Rel(spa, api, "Makes API calls to", "JSON/HTTPS")
Rel(spa, media_store, "Fetches property images from", "HTTPS")

Rel(api, db, "Reads from and writes to", "SQL/TCP")
Rel(api, email_sys, "Sends email notifications using", "SMTP / REST API")
Rel(api, media_store, "Uploads and manages media via", "HTTPS / SDK")

Rel(email_sys, customer, "Sends booking updates to", "Email")
Rel(email_sys, sales, "Sends new booking notifications to", "Email")
@enduml
"""

print("Generating PNG...")
req_png = urllib.request.Request(
    'https://kroki.io/plantuml/png',
    data=puml.encode('utf-8'),
    headers={'Content-Type': 'text/plain; charset=utf-8'}
)
with urllib.request.urlopen(req_png, timeout=15) as resp:
    with open('docs/containers_diagram.png', 'wb') as f:
        f.write(resp.read())
print("Saved docs/containers_diagram.png successfully!")

print("Generating SVG...")
req_svg = urllib.request.Request(
    'https://kroki.io/plantuml/svg',
    data=puml.encode('utf-8'),
    headers={'Content-Type': 'text/plain; charset=utf-8'}
)
with urllib.request.urlopen(req_svg, timeout=15) as resp:
    with open('docs/containers_diagram.svg', 'wb') as f:
        f.write(resp.read())
print("Saved docs/containers_diagram.svg successfully!")
