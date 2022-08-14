import React from 'react'
import "./sidebar.css";

import { Link } from 'react-router-dom';
import { TreeView, TreeItem } from "@mui/lab"
import { ExpandMore, PostAdd, Add, ImportExport, ListAlt, Dashboard, People, RateReview} from "@mui/icons-material"
import styled from "styled-components";

const Logo = styled.h1`
  font-weight: bold;
  margin-left: 2vmax;
  font-size: 3vmax;
`;

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to='/'>
            {/* <img src={logo} alt="Ecommerce" /> */}
            <Logo>MAVEE</Logo>
        </Link>
        <Link to='/admin/dashboard'>
            <p>
                <Dashboard/> Dashboard
            </p>
        </Link>
        <Link to='#'>
            <TreeView
                defaultCollapseIcon={<ExpandMore/>}
                defaultExpandIcon={<ImportExport />}
            >
                <TreeItem nodeId='1' label='Products'>
                    <Link to='/admin/products'>
                        <TreeItem nodeId='2' label="All" icon={<PostAdd />} />
                    </Link>

                    <Link to='/admin/product'>
                        <TreeItem nodeId='3' label="Create" icon={<Add />} />
                    </Link>
                </TreeItem>

            </TreeView>
        </Link>

        <Link to="/admin/orders">
            <p>
                <ListAlt />
                Orders
            </p>
        </Link>
        <Link to="/admin/users">
            <p>
                <People/>
                users
            </p>
        </Link>
        <Link to="/admin/reviews">
            <p>
                <RateReview />
                Reviews
            </p>
        </Link>

    </div>
  )
}

export default Sidebar