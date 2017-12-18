import React from 'react';
import Controls from './controls.jsx';
import TestRenderer from 'react-test-renderer';

it('renders correctly', () => {
    const inputValues = {};
    const tree = TestRenderer
        .create(<Controls inputValues="{inputValues}">Facebook</Controls>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});