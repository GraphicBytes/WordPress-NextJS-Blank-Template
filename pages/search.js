import PostsGrid from '../components/page-builder/PostsGrid';
 
export default function Search({ data }) { 
 
  return (
    <div>
       
      {data && ( 
        <span>  
          <h5>
            {data.found_posts} Result(s) found for ‘{data.search_key}’ 
          </h5>
    

         { Object.keys(data.posts[0]).map((item, index) => {
            let current = data.posts[0][item];
         
            return ( 
              <section>
                <h5>{current.label}</h5> 
                <PostsGrid data={current} padding={[]}/>  
              </section>
            )
          }) }  
        </span>
      )} 
     
    </div>
  );
}
