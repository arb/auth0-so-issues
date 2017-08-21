import TopTags from './containers/TopTags';
import Historical from './containers/Historical';
import HomePage from './components/HomePage';

const routes = [{
  path: '/',
  name: 'Home',
  component: HomePage,
}, {
  path: '/top-tags',
  name: 'Top Auth0 Tags',
  component: TopTags,
  secure: true,
}, {
  path: '/timline',
  name: 'Historical Issues',
  component: Historical,
  secure: true,
}];

export default routes;
