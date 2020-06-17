# Architecture.

* embeded: the code in the raspberry pi and its graphics.
* backend: the resources and code used for managing updates.
* visuals: pics and presentation in order to show the project.

# API description.

| Step | Method | Endpoint | Parameters | Value returned | Description |
| --- | --- | --- | --- | --- | --- |
| 1 | `GET` | `/register` | `id_hardware` | `checking_day` = a number between 0 and 28,<br>`checking_time` = a number between 0 and 23 | Get the day number and time when we will check for updates each month to avoid API explosion. Called only at the first boot! |
| 2 | `GET` | `/check_for_update` | `id_hardware`, `id_version` | `updates_found` = True or False | Allow us to check if there is an update available |
| 3 | `GET` | `/get_update` |  `id_hardware` | `bin` = The new binary | Download the new update |