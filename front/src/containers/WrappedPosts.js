import React, { Component, Fragment } from "react";
import queryString from "query-string";
import { withRouter } from "react-router-dom";
import Axios from "axios";
import PostView from "./PostView";
import Pagination from "../components/Pagination";

const calculatePagination = function(
  count_items,
  count_per_page,
  count_pagination,
  page_no
) {
  const count_page_group = Math.ceil(count_items / count_per_page); //페이징으로 보여질 총 페이지 개수
  let last_page_group =
    Math.ceil(page_no / count_pagination) * count_pagination; //현재 페이징에서 가장 마지막 페이지
  const first_page_group = last_page_group - count_pagination + 1; //현재 페이징에서 가장 첫 페이지
  if (last_page_group > count_page_group) {
    // 가장 마지막페이지가 전체 페이지 개수 보다 큰 경우
    last_page_group = count_page_group;
  }

  let page = {
    prev: first_page_group - 1 < 0 ? 0 : first_page_group - 1,
    first: first_page_group,
    last: last_page_group,
    cur: page_no > last_page_group ? last_page_group : page_no,
    next: last_page_group < count_page_group ? last_page_group + 1 : 0
  };
  return page;
};

class WrappedPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      url: "",
      posts: [],
      query: {
        skip: 0,
        limit: 5
      },
      pageinfo: {}
    };
  }

  componentDidMount() {
    console.log(this.props);
    const { match } = this.props;
    Axios.get(match.url)
      .then(response => {
        if (response.status === 200) {
          const { total, title, posts } = response.data;
          console.log("total:", total);
          const { skip = 0, limit = 5 } = this.state.query;
          const pageinfo = calculatePagination(total, limit, 5, skip + 1);
          console.log(pageinfo);
          this.setState({
            _id: title,
            url: match.url,
            posts: posts,
            pageinfo
          });
        }
      })
      .catch(err => {
        console.log(err);
      });
  }

  shouldComponentUpdate(prevProps, prevState) {
    const { location, match } = prevProps;
    const query = queryString.parse(location.search);

    console.log(match.url);

    if (match.url !== this.state.url) {
      Axios.get(`${match.url}${location.search}`)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              query,
              url: match.url,
              _id: response.data.title,
              posts: response.data.posts
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      return true;
    } else if (JSON.stringify(query) !== JSON.stringify(this.state.query)) {
      Axios.get(`${match.url}${location.search}`)
        .then(response => {
          if (response.status === 200) {
            this.setState({
              query,
              url: match.url,
              _id: response.data.title,
              posts: response.data.posts
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
      return true;
    }

    return false;
  }

  render() {
    return (
      <Fragment>
        <PostView {...this.state} />
        <Pagination {...this.state} />
      </Fragment>
    );
  }
}

export default withRouter(WrappedPosts);
