# Endpoints

To access Veritone's API, please ensure to use the following URL endpoints:

| Environment | URL Endpoint                    | Protocol | IP                      |
|-------------|---------------------------------|----------|-------------------------|
| US-Prod     | https://api.veritone.com        | HTTPS    | N/A                     |
| US-Prod     | https://api-static.veritone.com | HTTPS    | 3.218.245.87 <br> 18.213.128.17 <br> 34.231.237.177 <br> 34.195.184.63 <br> 35.171.48.170            |
| US-Prod     | https://api-static.aws-prod.veritone.com | HTTPS    | 3.218.245.87 <br> 18.213.128.17 <br> 34.231.237.177 <br> 34.195.184.63 <br> 35.171.48.170           |
| UK-Prod     | https://api.uk.veritone.com     | HTTPS    | N/A                     |
| UK-Prod     | https://api-static.aws-uk.veritone.com | HTTPS | 34.194.123.82       |

Over time, IP addresses may be added to or removed from these URL endpoints to enhance availability and resiliency. Changes will be communicated in advance and this page will include the most up to date list of IP Addresses.

## Deprecated and Decommissioned

11/26/2019: Load Balancer Re-Deployment. The change made may require you to change the end points your organization uses to reach the API. The following IPs will be removed from https://api-static.veritone.com on *December 20, 2019* at 6pm PST

    34.231.237.177
    34.195.184.63
    35.171.48.170
