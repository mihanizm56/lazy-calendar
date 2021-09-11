import { addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withConsole } from '@storybook/addon-console';
import 'reset-css';
import 'normalize.css';

addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});

addDecorator((story, context) => withConsole()(story)(context));
