<!-- markdownlint-disable -->

## Overview

This document describes the end to end process of onboarding an engine, from the business aspects to the tech, and then ongoing updates and monitoring.

## Business Workflow

For new engine onboarding, BU engine owners can either:

1. Open a new Account in Salesforce if the engine vendor is a new one. 
2. Open a new Opportunity in Salesforce if adding an engine by and existing vendor. 

The [Engines Qlik Dashboard](https://qlik.veritone.com/veritone/sense/app/48937db1-6a76-45c4-9b89-0a22e1b7c1cd/sheet/3225d592-13fd-40d4-89ed-2edd0e2c65ef/state/0) is the internal single source of truth and is syncing hourly with both production tables and Salesforce. 

<!-- INTERNAL

Salesforce has a schema for Engines:

TODO (Kfir / Sean / Trevor):

1. Engine owner name - available in Salesforce and can be pulled into Qlik 
2. BU name - not available in Salesforce and will have to be created 
3. Engine Price to the customer - available in Salesforce and can be pulled into Qlik   
4. Engine Vendor cost - available in Salesforce and can be pulled into Qlik (needs Veritone burden to calculate margin) 
5. Engine build number - available in Salesforce and can be pulled into Qlik 
6. BU engine owners need to be reassigned to Engine accounts in Salesforce. 
7. Flag for “visible externally" - not available and needs to be added in Salesforce. Then, we can programmatically pull a list of engines to a public website. (Inside the platform UI, we show every engine that is marked public or owned by the org). 

-->

## Engine Deployment Workflow

External docs: [Link](https://docs.veritone.com/#/developer/engines/tutorial/?id=_39hello-world39-engine-high-level-overview).

Internal spec: [Engine Approval Process](https://docs.google.com/document/d/1Ty3bUw3_20aoonFCKLyMn1MpCGRhkK5cVaykVq9li7s/edit?usp=sharing)

![](https://lh5.googleusercontent.com/otbaYNnEXPzdKUm-t4_AQEeg3kZilFR61eEeyKaJkG2dc1kq5YQSi_lAhMTzc5To3bUcRJYGyZCza7JgWSK6gd24V1dvaLo-l9SFPriEq_rxtn8oTNUb-SGdcHSaOgMPP6gDc_ux)

## Engine Certification Workflow

External docs: [Link](https://docs.veritone.com/#/developer/engines/approval/).

Internal spec: [Engine Certification Reqs](https://docs.google.com/document/d/1fXUAwfB9BqF8wSisI0jiVfeM9kq3vDKcNJhxM8Cuh6g/edit?usp=sharing)

![](https://lh6.googleusercontent.com/8pzXwFh4qNEV2Mg3FUaX9du-zmLQZYbp7CYc-2hdOtWxAhiiDYqPexo1dUDLGYFj8ryLbMVuBy0n44hELWoMvB1qFwkJ8-49RLNWzxT1BBZ7RCMQnrrKbT4qMkDnb7f-q8nEz2Pc)

1. Engine Docker container is registered in Developer 
2. Validate engine manifest is properly formatted 
3. Validate the manifest contains appropriate values based on selected cognitive capability.1 
4. Clair security check2 
5. Engine isolation check if the engine is network isolated (check how many external calls it makes)3 
6. Run the engine against a job appropriate for its capability and train the engine if necessary.4 
7. Confirm the output from the engine conforms to VTN standards. 
8. Collect engine stats such as CPU usage, GPU usage, processing time, memory usage.5 
9. Benchmark the engine against ground truth and other engines on the platform for metrics such as accuracy, processing time, and cost.6 
10. Add the engine to the daily heartbeat tests and add the recipient’s email.  
11. Send Notifications 
    1. On Failure 
        1. If any step in the process fails then send a notification to the user who onboarded the engine with failure details. 

    2. On Success 
        1. Recipients 
            1. If the organization settings are set to Auto-Approve send a notification only to the user who onboarded the engine 
            2. If the organization settings are NOT set to Auto-Approve send the notification to: 
                1. the user that onboarded the engine 
                2. platform ops 
                3. the engine team (Al, Kfir, Gus, Fran)  

        2. Message Contents 
            1. What steps the developer needs to take to get org approval 
            2. What Veritone will need to do 

1This is situationally dependant on the engine’s capability

2 Will be invoked by an API call to the VDA services - SETA team currently working on this

3 Will be invoked by an API call to the VDA services - SETA team currently working on this

4 We will be compiling a series of “baseline” media files to run against engines within the same capability

5 This is functionality is only available to engines on Edge 3 which use the toolkit

6 This is only supported for Transcription and will initially be an optional step

## Development Roadmap

- Deploy what is currently built to prod in a non-blocking way [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-181) 
- Work with Automate team to get workflow deployed as an engine [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-161) 
- Create success and failure message templates [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-182) 
- Create a way for the developer to indicate who else they want as a recipient [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-183) 
- Create API service endpoints to call [JIRA Ticket](https://steel-ventures.atlassian.net/browse/AI2-81) 
    - Security Check 
    - Network Isolation check 

- Integrate API EndPoints [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-137) 
- Collect sample media files for each capability [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-184) 
    - Store sample media files on S3 

- Integrate VTN-Standard check [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-136) 
- Integrate the ability to collect engine metrics from engine tool kit [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-97) 
- Integrate heartbeat check process [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-98) 
    - To be run on each engine periodically using the appropriate sample input media 
        - Create logic to determine if 
            - Engine is working 
            - Engine stats have degraded 
            - Notification mechanism 

- Implement benchmarking [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-138) 
    - Benchmark against our ground truth data 
    - As part of email provide user link to benchmarking results (takes them to the benchmarking app and the specific results for their engine - help socialize the benchmarking app) 
        - Let them know how to benchmark against additional engines 

- Implement custom fields to certification process [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-173) 
- Implement support for training to certification process [JIRA Ticket](https://steel-ventures.atlassian.net/browse/CXDX-174) 

## Resources

- [Engine Building Tutorial](https://docs.veritone.com/#/developer/engines/tutorial/) 
- [The Engine Certification Process](https://docs.veritone.com/#/developer/engines/approval/) 
- [Engine Types](https://docs.veritone.com/#/developer/engines/) 
- [Engine Manifest Standards](https://docs.veritone.com/#/developer/engines/standards/engine-manifest/) 
- [Cognitive Capabilities](https://docs.veritone.com/#/developer/engines/cognitive/) 
- [Extending Engine Output Beyond The VTN Standard](https://docs.veritone.com/#/developer/engines/tutorial/customizing-engine-output) 
- [Providing Commands To An Engine With Custom Fields](https://docs.veritone.com/#/developer/engines/tutorial/engine-custom-fields) 
- [Training An Engine With A Library](https://docs.veritone.com/#/developer/engines/tutorial/engine-training-tutorial) 
- [Engine Deployment Models](https://docs.veritone.com/#/developer/engines/deployment-model/) 
- [Engine Processing Modes](https://docs.veritone.com/#/developer/engines/processing-modes/) 
- [Building Automate Flows](https://docs.veritone.com/#/developer/flow/)