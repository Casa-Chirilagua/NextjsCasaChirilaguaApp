'use client'

//React
import { useState } from 'react';

//Next
import { useRouter } from 'next/navigation';
import Link from 'next/link';


//Icons
import { BsThreeDotsVertical } from 'react-icons/bs';
import { GrAdd } from 'react-icons/gr';
import Avatar from '@mui/material/Avatar';

//Functions
import HandleName from '@/functions/HandleName';

//data
import defaultProfilePicture from '@/public/profile_picture.png';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

function CardGrid({
  data,
  handleRemove,
  urlParam,
  urlParamForObject,
  color,
  objectType,
  objectId,
  objectTypeToUpdate,
}) {
  const router = useRouter()

  const [openPopUpMenu, setPopUpMenu] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [modalLabelAdd, setModalLabelAdd] = useState();
  const handleNavigate = (urlParam, id) => {
    router.push(`/${urlParam}/${id}`);
  };
  const handleClick = (event) => {
    setPopUpMenu(event.target);
  };
  const handleClose = () => {
    setPopUpMenu(false);
  };

  try {
    return (
      <div className="grid-card-container mx-24">
        {data ? (
          data.map((item, index) => {
            return (
              <div
                key={index}
                className="grid-card w-96"
              >
                {' '}
                <div style={{ backgroundImage: `url(${item.profile_image[0].url})`, opacity: "0.3" }}
                  className="dots-container bg-cover">
                  <div
                    aria-controls={openPopUpMenu ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={openPopUpMenu ? 'true' : undefined}
                    onClick={handleClick}
                    className="dots-border-container"
                  >
                    {/* <BsThreeDotsVertical
                      className="dots-card-grid"
                      style={{ fontSize: '2rem', color: '#E8E8E8' }}
                    /> */}
                  </div>
                  <Menu
                    id="basic-menu"
                    anchorEl={openPopUpMenu}
                    open={openPopUpMenu}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <MenuItem onClick={handleClose}>
                      {' '}
                      <div
                        onClick={() => handleRemove(item._id, HandleName(item))}
                      >
                        {' '}
                        Remove
                      </div>
                    </MenuItem>
                  </Menu>
                </div>

                <div className="grid-card-link flex flex-col items-center text-center p-4 gap-4 justify-center text-lg">
                  <Link href={`/${urlParamForObject}/${item._id}`}>
                    {HandleName(item)}
                  </Link>
                  <div className="grid-card-components-container ">
                    <div className="remove-button-container">
                      {' '}
                      <button
                        onClick={() => handleNavigate(urlParamForObject, item._id)}
                        className="card-remove-button"
                      >
                        View Profile
                      </button>
                    </div>{' '}
                  </div>

                </div>
              </div>
            );
          })
        ) : (
          <div></div>
        )}
        {/* 
        <div
          onClick={() => {
            setOpenModalAdd(true);
          }}
          className="grid-card-add"
        >
          <GrAdd style={{ color: 'red', fontSize: '8rem' }} />
          Add
        </div>
        <ConditionalModal
          objectTypeGrid={objectType}
          objectTypeToUpdate={objectTypeToUpdate}
          objectId={objectId}
          loadingToastMessage={`Updating ...`}
          successToastMessage={`Successfully updated!`}
          modalLabel={modalLabelAdd}
          setOpenModal={setOpenModalAdd}
          openModal={openModalAdd}
        /> */}
      </div>
    );
  } catch (error) {
    //error);
  }
}

export default CardGrid;
