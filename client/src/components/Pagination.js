import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "../index";
import {Pagination} from "react-bootstrap";

const Pages = observer(() => {

    const {item} = useContext(Context)
    const pageCount = Math.ceil(item.totalCount / item.limit)
    const pages = []

    for (let i=0; i< pageCount; i++) {
        pages.push(i+1)
    }

    return (
        <Pagination variant="dark" className="mt-3 justify-content-center">
            {pages.map(page=>
                <Pagination.Item variant="dark" key={page} active={item.page === page} onClick={()=>item.SetPage(page)}>{page}</Pagination.Item>
            )}
        </Pagination>

    );


});

export default Pages;