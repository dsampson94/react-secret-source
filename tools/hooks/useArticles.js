import React from 'react';

export const useArticles = (topPosts) => {
  if (topPosts)
    return [
      {
        title: 'Easy HTML table in React',
        caption: '',
        route: '/react/easyreacthtmltable',
        image: '/easytable.png'
      },
      {
        title: 'Synchronized Line Charts with D3.js and React',
        caption: '',
        route: '/d3/synchronizedlinecharts',
        image: '/linecharts.png'
      }
    ];
  else
    return [
      {
        react: [
          {
            title: 'Easy HTML table in React',
            caption: '',
            route: '/react/easyreacthtmltable'
          }
        ]
      },
      {
        native: []
      },
      {
        next: []
      },
      {
        d3: [
          {
            title: 'Synchronized Line Charts with D3.js and React',
            caption: '',
            route: '/d3/synchronizedlinecharts'
          }
        ]
      }
    ];
};
