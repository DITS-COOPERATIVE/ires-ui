export const navbarData =[
    {
        routeLink: 'dashboard',
        icon: 'fal fa-home',
        label: 'Dashboard',
        roles: ['Admin']
    },
    {
        routeLink: 'orders',
        icon: 'fal fa-shopping-cart',
        label: 'Order',
        roles: ['Admin']
    },
    {
        routeLink: 'products',
        icon: 'fal fa-box-open',
        label: 'Product',
        roles: ['Admin']
    },
    {
        routeLink: 'customers',
        icon: 'fal fa-users',
        label: 'Customer',
        roles: ['Admin']
    },
    {
        routeLink: 'reservations',
        icon: 'far fa-calendar-alt',
        label: 'Reservations',
        roles: ['Admin','Cashier']
    },
    {
        routeLink: 'reports',
        icon: 'fal fa-file-chart-line',
        label: 'Reports',
        roles: ['Admin']
    },
    // {
    //     routeLink: 'stocks',
    //     icon: 'fal fa-chart-bar',
    //     label: 'Stock',
    //     roles: ['Admin']
    // },
    {
        routeLink: 'transactions',
        icon: 'fal fa-cash-register',
        label: 'POS',
        roles: ['Admin', 'Cashier']
    },
    {
        routeLink: 'settings',
        icon: 'fas fa-user-cog',
        label: 'Cashier',
        roles: ['Admin']
    }
];
