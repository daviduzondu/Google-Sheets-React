import React from 'react'
import { useState, useEffect } from 'react';
import HTMLReactParser from 'html-react-parser';
import useFetch from '../Hooks/useFetch';
import { useParams } from 'react-router-dom';
function FindPage() {
    const [similarPosts, setSimilarPosts] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const { tag } = useParams();
    const { data, loading, error } = useFetch("all");

    useEffect(() => {
        let posts = [];
        posts = data.find((obj) => {
            if (obj.tags.includes(tag)) {
                posts.push(obj);
                setSimilarPosts(posts);
                setNotFound(false);
            } else {
                setNotFound(true);
            }
        })
    }, [data])

    if (similarPosts.length !== 0) {
        return (
            <div className='search-results'>
                <h1>Showing posts with tag: "{tag}"</h1>
                {
                    similarPosts.sort((a, b) => b.id - a.id).map((element) => {
                        return (
                            <div className="post-card" key={element.id} onClick={() => window.open(`/posts/${element.id}`, "_self")}>
                                <h2>{element["title"]}</h2>
                                <div><em>Posted on {element["Date"]} by {element["author"]}</em></div>
                                <h5>{
                                    HTMLReactParser(
                                        element["content"].length > 500 ? element["content"].substring(0, element["content"].length - (70 / 100) * element["content"].length) :
                                            element["content"]
                                    )}...</h5>
                                    <div className='read-more'>Read more</div>
                            </div>
                        )
                    })
                } </div>
        )
    }

    if (notFound) {
        return <h1>Error! No posts with tag: "{tag}" was found...</h1>
    }
    if (error) {
        return <h1 style={{ textAlign: "center" }}>Something went wrong. Check your internet connection...</h1>
    }
    if (loading) {
        return (
            <h1>Searching for posts with tag: "{tag}"...</h1>
        )
    }
}

export default FindPage