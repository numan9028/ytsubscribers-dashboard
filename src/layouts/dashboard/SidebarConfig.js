import Iconify from '../../components/Iconify';
// component

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const isAdmin = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Orders',
    path: '/dashboard/orders',
    icon: getIcon('wpf:sent')
  },
  // {
  //   title: 'find Order',
  //   path: '/dashboard/orders/find-order',
  //   icon: getIcon('ic:baseline-find-in-page')
  // },
  {
    title: 'stripe Setting',
    path: '/dashboard/stripe-setting',
    icon: getIcon('bxl:stripe')
  },
  {
    title: 'users',
    path: '/dashboard/users',
    icon: getIcon('eva:people-fill'),
    subItem: [
      {
        item: [
          {
            title: 'User List',
            path: '/dashboard/users',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Users Roles',
            path: '/dashboard/user-role',
            icon: getIcon('bxs:food-menu')
          }
        ]
      }
    ]
  },
  {
    title: 'Pages',
    path: '/dashboard/pages',
    icon: getIcon('ion:documents-sharp'),
    subItem: [
      {
        item: [
          {
            title: 'Home',
            path: '/dashboard/pages/home',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'About',
            path: '/dashboard/pages/about',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Contact',
            path: '/dashboard/pages/contact',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Faq Page',
            path: '/dashboard/pages/faq',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'terms of service',
            path: '/dashboard/pages/terms',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Refund Policy',
            path: '/dashboard/pages/refund-policy',
            icon: getIcon('bxs:food-menu')
          }
        ]
      }
    ]
  },
  {
    title: 'Blogs',
    path: '/dashboard/blogs',
    icon: getIcon('bxs:food-menu')
  },
  {
    title: 'Faqs',
    path: '/dashboard/pages/faqs',
    icon: getIcon('wpf:faq')
  },
  {
    title: 'Packages',
    path: '/dashboard/packages',
    icon: getIcon('bxs:package'),
    subItem: [
      {
        item: [
          {
            title: 'Packages List',
            path: '/dashboard/packages',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Packages Categories',
            path: '/dashboard/package-category',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Duration',
            path: '/dashboard/durations',
            icon: getIcon('bxs:food-menu')
          }
        ]
      }
    ]
  },
  {
    title: 'Why Us',
    path: '/dashboard/why-us',
    icon: getIcon('mdi:information')
  },
  {
    title: 'Addons',
    path: '/dashboard/addons',
    icon: getIcon('ic:baseline-reviews')
  },
  {
    title: 'Reviews',
    path: '/dashboard/reviews',
    icon: getIcon('ic:baseline-reviews')
  },
  {
    title: 'Pending Reviews',
    path: '/dashboard/pending-reviews',
    icon: getIcon('ic:baseline-reviews')
  },
  {
    title: 'Coupon Code',
    path: '/dashboard/coupons',
    icon: getIcon('ri:coupon-2-fill')
  },
  {
    title: 'Sitemap',
    path: 'edit-sitemap',
    icon: getIcon('bxs:food-menu')
  }
];
const isUser = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill')
  },
  {
    title: 'Pages',
    path: '/dashboard/pages',
    icon: getIcon('ion:documents-sharp'),
    subItem: [
      {
        item: [
          {
            title: 'Home',
            path: '/dashboard/pages/home',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'About',
            path: '/dashboard/pages/about',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Contact',
            path: '/dashboard/pages/contact',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'terms of service',
            path: '/dashboard/pages/terms',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Refund Policy',
            path: '/dashboard/pages/refund-policy',
            icon: getIcon('bxs:food-menu')
          }
        ]
      }
    ]
  },
  {
    title: 'Blogs',
    path: '/dashboard/blogs',
    icon: getIcon('eva:file-text-fill')
  },
  {
    title: 'Faqs',
    path: '/dashboard/pages/faqs',
    icon: getIcon('wpf:faq')
  },
  {
    title: 'Packages',
    path: '/dashboard/packages',
    icon: getIcon('bxs:package'),
    subItem: [
      {
        item: [
          {
            title: 'Packages List',
            path: '/dashboard/packages',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Packages Categories',
            path: '/dashboard/package-category',
            icon: getIcon('bxs:food-menu')
          },
          {
            title: 'Duration',
            path: '/dashboard/durations',
            icon: getIcon('bxs:food-menu')
          }
        ]
      }
    ]
  },
  {
    title: 'Why Us',
    path: '/dashboard/why-us',
    icon: getIcon('mdi:information')
  },
  {
    title: 'Addons',
    path: '/dashboard/addons',
    icon: getIcon('ic:baseline-reviews')
  },
  {
    title: 'Reviews',
    path: '/dashboard/reviews',
    icon: getIcon('ic:baseline-reviews')
  },
  {
    title: 'Category Reviews',
    path: '/dashboard/category-reviews',
    icon: getIcon('ic:baseline-reviews')
  },
  {
    title: 'Coupon Code',
    path: '/dashboard/coupons',
    icon: getIcon('ri:coupon-2-fill')
  },
  {
    title: 'Sitemap',
    path: 'edit-sitemap',
    icon: getIcon('ri:coupon-2-fill')
  }
];
// Check the user role
// const name = localStorage.getItem('role');
// const sidebarConfig = name == '1' ? isAdmin : isUser;

export default function sidebarConfig(role) {
  return role == '1' ? isAdmin : isUser;
};
