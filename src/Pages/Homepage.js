import React from 'react'
import useFetch from '../Hooks/useFetch';
import HTMLReactParser from 'html-react-parser';
function Homepage() {
    const { data, error } = useFetch("all");

    return (
        <>
            <header>
                <h1>Google Sheets Blog</h1>
                <h4>A simple blog powered by Google Sheets</h4>
                <div>Showing {data.length} posts</div>
            </header>
            {(!error) ?
                <div>
                    {
                        // Sort through the array in ascending order
                        data.sort((a, b) => b.id - a.id).map((element) => {
                            return (
                                <div className="post-card" key={element.id} onClick={() => window.open(`/posts/${element.id}`, "_self")}>
                                    <h2>{element["title"]}</h2>
                                    <div><em>Posted on {element["date"]} by {element["author"]}</em></div>
                                    <h5>{
                                        HTMLReactParser(
                                            element["content"].length > 500 ? element["content"].substring(0, element["content"].length - (90 / 100) * element["content"].length) :
                                                element["content"]
                                        )}...</h5>
                                    <div className='read-more'>Read more</div>
                                </div>
                            )
                        })
                    }
                </div> : <h3 style={{textAlign:"center"}}>Something went wrong. Check your internet connection...</h3>}
        </>
    )
}

export default Homepage