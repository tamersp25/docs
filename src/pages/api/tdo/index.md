---
title: TDO
---

#### Retrieve a list of Temporal Data Objects

```graphql
---
---
query {
  temporalDataObjects {
    records {
      id,
      name,
      description,
      tasks {
        records {
          id,
          name,
          description
        }
      }
    }
  }
}
---
```

&nbsp;
&nbsp;

#### Retrieve a Temporal Data Object

```graphql
---
---
query {
  temporalDataObject(id: 42027543) {
    id,
    name,
    description,
    tasks {
      records {
        id,
        name,
        description
      }
    }
  }
}
---
```
