import Layout from '../../components/layout';
import { getAllPostIds, getPostData } from '../../libs/posts';
import Head from 'next/head';
import Date from '../../components/data';
import utilStyles from '../../styles/utils.module.css';

//Q: where does the props 'params' come from?
export async function getStaticProps({ params }) {
  const postData = await getPostData(params.id);
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
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        {/*render contentHtml using dangerouslySetInnerHTML */}
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
}
