import React from 'react'
import { useEffect, useState } from 'react'
function useFetch(id) {
    const SPREADSHEET_ID='1YvOk7KB8gdkxWAKSGemzwTHHWLD7ZhS1Jzp75VRAKxI';
    const API_KEY='AIzaSyDlAXAO16OFx429epgykbldChbn1Yu8k04'
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [exists, setExists] = useState(null);
    let url;
    if (id === "all") {
        url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1?key=${API_KEY}`;
    } else {
        url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/Sheet1!${id}:${id + 1}?key=${API_KEY}`;
    }
    useEffect(() => {
        fetch(url)
            .then(res => {
                if (res.status !== 200) {
                    setError(true);
                    throw new Error("Something went wrong!");
                }
                console.log(res);
                return res.json();
            })
            .then(data => {
                // Check if the data object has a 'values' key.
                if (!data.hasOwnProperty("values")) {
                    setLoading(false);
                    setExists(false);
                } else {
                    let sheetArray = data.values;
                    const jsonData = sheetArray.slice(1).map((value, index) => ({
                        id: index + 1,
                        title: value[0],
                        content: value[1],
                        author: value[2],
                        date: value[3],
                        tags: value[4]
                    }));
                    console.log(sheetArray.length);
                    if (sheetArray.length === 1) {
                        setError(true);
                        setExists(false);
                    } else {
                        setData(jsonData);
                        setExists(true);
                    }
                    setLoading(false);
                }
            })
            .catch(() => {
                setError(true);
            })

    }, []);
    return { data, loading, error, exists };

}

export default useFetch
