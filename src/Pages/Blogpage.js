import React from 'react'
import useFetch from '../Hooks/useFetch';
import { useParams } from 'react-router-dom';
import HTMLReactParser from 'html-react-parser';
import { Link } from 'react-router-dom';

function Blogpage() {
    const { id } = useParams();
    const { data, loading, error, exists } = useFetch(parseInt(id));
    if (!loading && exists) {
        return (
            <div>{
                data.map((element) => {
                    return <div key={element.id}>
                        <div>
                            <h1 className='title'>{element.title}</h1>
                            <div className='post-info'>
                                <div className='author'>{element.author}</div>
                                <div className='date'>{element.date}</div>
                            </div>
                        </div>
                        <div className='content'>{HTMLReactParser(element.content)}</div>
                        <div className='tags'>{element.tags.split(",").map((tag) => {
                            return (
                                <Link className='tag' style={{ textDecoration: "none" }} to={`/tags/${tag.trim()}`}>
                                    <span>
                                        #{tag}
                                    </span></Link>
                            )
                        })}</div>
                    </div>
                })
            }
            </div>
        )
    }

    // Check for internet error
    if (error) {
        return (<h1 style={{ textAlign: "center" }}>Something went wrong. Check your internet connection...</h1>)
    }

    // Check if post has stopped loading and post does not exist.
    if (!loading && !exists) {
        window.open("/*", "_self")
    }

    if (loading) {
        return (
            <>
                <h1>Loading...</h1>
            </>
        )
    }
}

export default Blogpage