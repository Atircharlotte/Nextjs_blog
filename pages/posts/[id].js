import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../libs/posts';

//Q: where does the props 'params' come from?
export async function getStaticProps({ params }) {
  const postData = getPostData(params.id);
  return {
    props: {
      postData,
    },
  };
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}
//Q: why do we need to export getStaticPaths? (function and Post commponent are at the same page?)
export default function Post({ postData }) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  );
}
