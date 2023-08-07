import fs from 'fs'; //a Node.js module that let's you read file from the file system
import path from 'path'; // a Node.js module that let's you manipulate file paths
import matter from 'gray-matter'; //a library that lets you parse the metadata in each markdown file
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

//return the kist of the file names in the posts directory
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  //it will return an array
  return fileNames.map((filename) => {
    return {
      params: {
        id: filename.replace(/\.md$/, ''),
      },
    };
  });
  //caution! the returned list must be an array of objects
}

//fetch necessary data to render the post with the given id
export async function getPostData(id) {
  //I don't understand two lines below(to be learned)
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  //use gray-matter to parse the post metedata section
  const matterResult = matter(fileContents);
  //use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();
  //combine the data with id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
