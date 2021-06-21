import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard';

const client = createClient({
  space: process.env.SPACE_ID,
  accessToken: process.env.ACCESS_TOKEN,
});

export async function getStaticProps() {
  const res = await client.getEntries({ content_type: 'recipe' });

  return {
    props: { recipes: res.items },

    // after the first refresh or request. check the data source after 1 second to see
    //if the data has changed after the last build. if it has regenerate the page that uses the data

    //and it will only generate for pages that already exist
    revalidate: 10,
  };
}

export default function Recipes({ recipes }) {
  return (
    <div className="recipe-list">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.sys.id} recipe={recipe} />
      ))}

      <style jsx>
        {`
          .recipe-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 20px 60px;
          }
        `}
      </style>
    </div>
  );
}
