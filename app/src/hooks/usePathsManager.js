import React, { useEffect, useState } from "react";
import { GET_INIT_EVENT_URL } from "../utils/constants";

const usePathsManager = (setPathChanged, setClientId ) => {
    const [pathList, setPathList] = useState([])

    const verifyPath = (path) => {
        const isUnique = pathList.some((item) => path === item)

        if (isUnique) {
            throw new Error('Path already exists')
        }

        pathList.forEach((item) => {
            if (path.includes(item)) { 
                throw new Error(`${item} is a subset of ${path}. To avoid re-loading ${path} again, please re-fresh page and try again.`)
            } else if (item.includes(path)) {
                throw new Error(`${path} is a superset of ${item}. To avoid re-loading ${item} again, please re-fresh page and try again.`)
            }
        });
    }
    

    const cleanUpPath = (path) => {
        return path.replace(/\s/g, "")
    }

    const addPath = (paths) => {
        paths.forEach(path => {
            const cleanedPath = cleanUpPath(path)
            setPathList((prevList) => [...prevList, path])
        })
    }

    return [
        addPath,
        verifyPath
    ]
};

export default usePathsManager;
