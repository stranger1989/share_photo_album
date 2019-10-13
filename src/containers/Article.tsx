import React, { FC } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Article from '../components/Article';

const mapStateToProps = (state: any): any => ({});

const mapDispatchToProps = (dispatch: Dispatch): any => {
  return {};
};

const ArticleContainer: FC<any> = () => {
  return <Article />;
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArticleContainer);
