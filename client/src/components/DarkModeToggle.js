import React from 'react';
import Tooltip from "@material-ui/core/Tooltip";
import useDarkMode from 'use-dark-mode';
import Favorite from "@material-ui/icons/WbIncandescentOutlined";
import FavoriteBorder from "@material-ui/icons/WbIncandescentRounded";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const DarkModeToggle = () => {
    const darkMode = useDarkMode(false);

    return (
        <div>


            <Tooltip id="blackmode" title={"Dark Mode"}>
                <FormControlLabel
                    control={
                        <Checkbox

                            icon={<FavoriteBorder id="blackmode" fontSize="large" style={{ color: "white" }} />}
                            checkedIcon={<Favorite id="blackmode" fontSize="large" style={{ color: "white" }} />}
                            value="checkedI"
                            onClick={darkMode.toggle} />
                    }

                />

            </Tooltip>

        </div>
    );
};

export default DarkModeToggle;
