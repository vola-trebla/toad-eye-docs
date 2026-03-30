---
title: Installation & Stack Setup
description: Install toad-eye and set up the observability stack with Docker.
---

```bash
npm install toad-eye
npx toad-eye init       # scaffold observability configs
npx toad-eye up         # start Grafana + Prometheus + Jaeger + OTel Collector
npx toad-eye demo       # send mock traffic — see data in Grafana immediately
```

Open [localhost:3100](http://localhost:3100) (Grafana, admin/admin).

:::note
This page is under construction. Full content coming soon.
:::
