import { configure } from '@kadira/storybook';
import 'bootstrap/dist/css/bootstrap.css'

function loadStories() {
  require('../stories');
}

configure(loadStories, module);
