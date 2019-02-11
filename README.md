# mock-generator

## Getting started

Install the module with: `npm install simulateagent --save-dev`

* simulate backend api for web developer

* run `simulate-api` to start service

* visit simulate api data on the page `http://localhost:8992/`

* example

```
project name: test

method: GET

URL:

/public/branch_banks_status?random=1548896596585

data:

{
    "meta": {
        "status": true,
        "info": "Get branch banks status overview successfully.",
        "code": null
    },
    "data": {
        "5c3437a57585e77f3023f93c": [
            {
                "bank_name": "aa_bank",
                "flows_out": 0,
                "from": "10.124.209.33",
                "branch_bank_ip": "10.124.209.33",
                "width_in": 1000000,
                "width": 1000000,
                "width_out": 1000000,
                "in": 0,
                "headbanks": [
                    {
                        "branch_router_ip": "10.124.209.33",
                        "name": "s_a",
                        "bank_name": "szx",
                        "branch_router_iface": "1",
                        "bank_id": "5c3437a57585e77f3023f93c",
                        "flow_path_order": "0",
                        "branch_bank_iface_width": 1000000,
                        "head_router_iface": "4",
                        "head_bank_iface_width": 1000000,
                        "_id": {
                            "$oid": "5c3437a6039d4fb9017728ff"
                        },
                        "head_router_ip": "10.124.209.18",
                        "order": "0"
                    }
                ],
                "net_level_values": [
                    50,
                    80
                ],
                "to": "10.124.209.18",
                "city": "city",
                "branch_bank_hostname": "x_a",
                "head_bank_ip": "10.124.209.18",
                "head_bank_hostname": "s_a",
                "out": 0,
                "order": "0",
                "flows_in": 0
            }
        ]
    }
}

```

Test the simulated api:

`http://localhost:8992/public/branch_banks_status?random=1548896596585`


