// get_Offers.js

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function getOffers(accessToken) {
    const url = `${process.env.ALLEGRO_SANDBOX_BASE_URL}/sale/offers`;

    try {
        const res = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.allegro.public.v1+json",
            },
        });

        console.log("Categories:", res.data);
    } catch (err) {
        console.error("API error:", err.response?.data || err.message);
    }
}

// Example usage (use token from your callback step)
getOffers("eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2FsbGVncm8ucGwuYWxsZWdyb3NhbmRib3gucGwiLCJ1c2VyX25hbWUiOiIxMDk4ODM2NTkiLCJzY29wZSI6WyJhbGxlZ3JvOmFwaTpvcmRlcnM6cmVhZCIsImFsbGVncm86YXBpOmZ1bGZpbGxtZW50OnJlYWQiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOndyaXRlIiwiYWxsZWdybzphcGk6c2FsZTpvZmZlcnM6d3JpdGUiLCJhbGxlZ3JvOmFwaTpmdWxmaWxsbWVudDp3cml0ZSIsImFsbGVncm86YXBpOmJpbGxpbmc6cmVhZCIsImFsbGVncm86YXBpOmNhbXBhaWducyIsImFsbGVncm86YXBpOmRpc3B1dGVzIiwiYWxsZWdybzphcGk6YWZmaWxpYXRlOndyaXRlIiwiYWxsZWdybzphcGk6YmlkcyIsImFsbGVncm86YXBpOnNoaXBtZW50czp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6b2ZmZXJzOnJlYWQiLCJhbGxlZ3JvOmFwaTpvcmRlcnM6d3JpdGUiLCJhbGxlZ3JvOmFwaTphZHMiLCJhbGxlZ3JvOmFwaTpwYXltZW50czp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6c2V0dGluZ3M6d3JpdGUiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOnJlYWQiLCJhbGxlZ3JvOmFwaTphZmZpbGlhdGU6cmVhZCIsImFsbGVncm86YXBpOnJhdGluZ3MiLCJhbGxlZ3JvOmFwaTpzYWxlOnNldHRpbmdzOnJlYWQiLCJhbGxlZ3JvOmFwaTpwYXltZW50czpyZWFkIiwiYWxsZWdybzphcGk6c2hpcG1lbnRzOnJlYWQiLCJhbGxlZ3JvOmFwaTptZXNzYWdpbmciXSwiYWxsZWdyb19hcGkiOnRydWUsImV4cCI6MTc1OTAxNDUyNiwiY2xpZW50X2lkIjoiMTM4MjFkOTJkOTU3NDcwZjgyMzBkM2M0MWNkODgwNzYiLCJqdGkiOiIyMjExZjA2Zi0yOTUxLTQyNjQtYjBmNi1hNzZiNGY5OWU3ZDgifQ.Goce9fd6wcEjB8HpvKTpA6ciAoaH0OXe9pjYJouGpSiUTGzIE209pcoQLniQvfy-zWBHym0sdxa9sWPSRMHOzp6NXL0dvBL5kd7V8rZbohFjAy7gl0NCLvoifEw9w73YGoHOr9WPLe0kycjKEwcQEqBY-vkypyyvC5KUCKYwoTi1mGgrZxQ4Pfc0sRnwQLs4hxFeJa__GJRjonbwkYv5-CNnEjmdSdoWdTrdFKqASt_GUeuvUtQC6HXUW2F5URS5acfc7sEVegps_ZB5wm-VWUjZwS9-cazJ0V1-G31hTnVVm-AsOGcA9-tx2F43Vo0OGkT4mIQlDmixU_f4tK92Ykj-fmlw-AW2M5sZ5GPNwAiImzdgyLqBXA7u90XNKqHhpAF6qcm-Z2FnbkjmjKc-Gap7qKO8y3W-0DphQe0EUztd8Rxdp4yN0OD-BbZyNedWFXuJeZiO-7TXSlcahiUM52YJFbfg9CaEGQpiJYqfxzoEr6CXGo1sFH7-JJTUroEZafxdDf6XVVRVVrzpdlhVdK1y0ce5USKgM0t_-E3qLyu6deIPfH_fTEQQGOWTEngBcryFvzuFEbCAGxNF42rLvtoIfIM6Qsw91gzg-1A6J6HHOUwaeJr-Dg6NGIDlIYwmR40AuYY04Mlcsxc4EjgD63xDm9GwrSbfJ77S_TUuI9g");
