# art-appreciation-app

This app was setup with the following github template:
**skeleton-react-single-page-app**

Refer to README.md of the template for details if necessary, but note that the tmeplate is farily frequently updated.

## Project Side Objectives

- Explore more flexible use of react-routing
- Full testing on front-end

## To add to the template

Additions for template, while developing this app.

### Add additional subdirectory structure

Note, incorporate this with the other subdirectory things already added - tests, services, etc.

```markdown
- src/
  - components/
    - pages/ - should correspond directly with a "page" within the single page app
    - layouts/ - elements that form part of the layout of every page - e.g. navbar
    - composites/ - repeated components with some depth to them
    - primitives/ - very basic, 1 dimensional, repeated component
    - styledComponents/ - designed components used with Material UI
  - lib/ - core logic
  - utils/ - small, reusable logic outside core logic
```

### Move existing pages to components/pages subdirectories

General clear out of src base directory of page components and hook
