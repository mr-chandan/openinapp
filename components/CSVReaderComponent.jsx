"use client"
import React, { useState } from 'react';
import CSVReader from 'react-csv-reader';
import styles from "../src/app/dashboard/styles.module.css"
import Papa from "papaparse";

const CSVReaderComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState({});

  const toggleDropdown = (id) => {
    setDropdownVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  //State to store table Column name
  const [tableRows, setTableRows] = useState([]);

  //State to store the values
  const [values, setValues] = useState([]);
  const [fileName, setFileName] = useState("");
  const [selectedTags, setSelectedTags] = useState({});


  const handleTagSelect = (id, selectedTag) => {
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [id]: prevSelectedTags[id] ? [...prevSelectedTags[id], selectedTag] : [selectedTag],
    }));
  };

  function Dataprocess() {

    Papa.parse(selectedFile, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        const rowsArray = [];
        const valuesArray = [];

        console.log(results)

        // Iterating data to get column name and their values
        results.data.map((d) => {
          rowsArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
        });

        // Parsed Data Response in array format
        setParsedData(results.data);

        // Filtered Column Names
        setTableRows(rowsArray[0]);

        // Filtered Values
        setValues(valuesArray);
      },

    });
  }



  const handleTagRemove = (id, removedTag) => {
    setSelectedTags((prevSelectedTags) => ({
      ...prevSelectedTags,
      [id]: prevSelectedTags[id].filter(tag => tag !== removedTag),
    }));
  };

  const handleTagToggle = (id, tag) => {
    setSelectedTags((prevSelectedTags) => {
      const currentTags = prevSelectedTags[id] || [];
      if (currentTags.includes(tag)) {
        return {
          ...prevSelectedTags,
          [id]: currentTags.filter((t) => t !== tag),
        };
      } else {
        return {
          ...prevSelectedTags,
          [id]: [...currentTags, tag],
        };
      }
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    setFileName(file.name);
    console.log(e.target.files[0])

  };

  const handleDropAreaClick = () => {
    if (!selectedFile) {
      fileInputRef.current.click();
    }
    // Trigger the hidden file input when the drop area is clicked

  };
  const fileInputRef = React.createRef();

  const changeHandler = (event) => {
    console.log(event.target.files[0])
  };

  function removefile() {
    setSelectedFile(null);
    setFileName(null);
  }

  return (
    <div>
      <div className={styles.upload}>
        <div className={styles.mainbox}>
          <div className={styles.dootedlines} onClick={handleDropAreaClick}>
            <div className={styles.divp}>
              <svg
                width="30"
                height="28"
                viewBox="0 0 30 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_22_2725)">
                  <path
                    d="M18.7801 13.2998L6.95557 11.1998V26.7167C6.95557 27.4253 7.52638 27.9998 8.23053 27.9998H28.6341C29.3382 27.9998 29.9091 27.4253 29.9091 26.7167V20.9998L18.7801 13.2998Z"
                    fill="#185C37"
                  />
                  <path
                    d="M18.7802 0H8.23059C7.52644 0 6.95563 0.57446 6.95563 1.2831V7L18.7802 14L25.0402 16.1L29.9091 14V7L18.7802 0Z"
                    fill="#21A366"
                  />
                  <path d="M6.95563 7H18.7802V14H6.95563V7Z" fill="#107C41" />
                  <path
                    opacity="0.1"
                    d="M15.4185 5.60049H6.95557V23.1005H15.4185C16.1216 23.0982 16.6911 22.5251 16.6934 21.8174V6.88359C16.6911 6.17591 16.1216 5.60279 15.4185 5.60049Z"
                    fill="black"
                  />
                  <path
                    opacity="0.2"
                    d="M14.7229 6.30025H6.95557V23.8002H14.7229C15.4261 23.7979 15.9956 23.2248 15.9978 22.5171V7.58334C15.9956 6.87567 15.4261 6.30255 14.7229 6.30025Z"
                    fill="black"
                  />
                  <path
                    opacity="0.2"
                    d="M14.7229 6.30025H6.95557V22.4002H14.7229C15.4261 22.3979 15.9956 21.8248 15.9978 21.1172V7.58334C15.9956 6.87567 15.4261 6.30255 14.7229 6.30025Z"
                    fill="black"
                  />
                  <path
                    opacity="0.2"
                    d="M14.0273 6.30025H6.95557V22.4002H14.0273C14.7305 22.3979 15.3 21.8248 15.3023 21.1172V7.58334C15.3 6.87567 14.7305 6.30255 14.0273 6.30025Z"
                    fill="black"
                  />
                  <path
                    d="M1.27496 6.30025H14.0274C14.7315 6.30025 15.3023 6.87471 15.3023 7.58334V20.4171C15.3023 21.1258 14.7315 21.7002 14.0274 21.7002H1.27496C0.570817 21.7002 0 21.1258 0 20.4171V7.58334C0 6.87471 0.570817 6.30025 1.27496 6.30025Z"
                    fill="url(#paint0_linear_22_2725)"
                  />
                  <path
                    d="M3.94867 18.1706L6.63075 13.9881L4.17334 9.82869H6.15011L7.49115 12.4887C7.61497 12.7414 7.69982 12.929 7.74574 13.0529H7.76312C7.85123 12.8513 7.94397 12.6555 8.04135 12.4656L9.47489 9.8301H11.2896L8.76959 13.965L11.3536 18.1706H9.42274L7.87372 15.2509C7.80075 15.1267 7.73884 14.9962 7.68871 14.861H7.66576C7.62038 14.9934 7.56018 15.1203 7.4863 15.239L5.89138 18.1706H3.94867Z"
                    fill="white"
                  />
                  <path
                    d="M28.6342 0H18.7802V7H29.9091V1.2831C29.9091 0.57446 29.3383 0 28.6342 0Z"
                    fill="#33C481"
                  />
                  <path
                    d="M18.7802 14H29.9091V21H18.7802V14Z"
                    fill="#107C41"
                  />
                </g>
                <defs>
                  <linearGradient
                    id="paint0_linear_22_2725"
                    x1="2.65832"
                    y1="5.29766"
                    x2="12.7396"
                    y2="22.6473"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#18884F" />
                    <stop offset="0.5" stop-color="#117E43" />
                    <stop offset="1" stop-color="#0B6631" />
                  </linearGradient>
                  <clipPath id="clip0_22_2725">
                    <rect width="29.9091" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>


              {!selectedFile && <div className={`${styles.register} ${styles.opp}`}>
                <div className={styles.dropArea} >
                  Drop your excel sheet here or
                </div>


                <input
                  ref={fileInputRef}
                  className="file-input"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                /><div className={styles.clrreg}>browse</div>
              </div>}


              {<div className={`${styles.register} ${styles.hear}`} >
                <div className={styles.dropArea} >
                  Upload Your Excel sheet
                </div>


                <input
                  ref={fileInputRef}
                  className="file-input"
                  type="file"
                  name="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <div className={styles.clrreg}>here</div>
              </div>}




              {selectedFile &&
                <div className={styles.showfile}>
                  <div className={styles.dropArea} >
                    {fileName}
                  </div>


                  <div className={styles.wrong} onClick={removefile}>remove</div>
                </div>
              }



              {/* <div className={styles.register}>


                Drop your excel sheet here or
                <input class="file-input" type="file" name="file" />
              </div> */}
            </div>
          </div>
          <div className={styles.btnn} onClick={Dataprocess}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.125 14.1923V16.9327C19.125 18.1435 18.1435 19.125 16.9327 19.125H7.06731C5.85653 19.125 4.875 18.1435 4.875 16.9327V14.1923M12 15.8365V4.875M12 4.875L8.71154 8.16346M12 4.875L15.2885 8.16346"
                stroke="white"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
            Upload
          </div>
        </div>
      </div>
      
      <div className={styles.tablecont}>
        <div className={styles.scro}>
          <div className={styles.uploadsss}>Uploads</div>
          <div className={styles.tablebox}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Sl No.</th>
                  <th>Links</th>
                  <th>Prefix</th>
                  <th>Add Tags</th>
                  <th>Selected Tags</th>
                </tr>
              </thead>
              <tbody className={styles.bodytable}>
                {parsedData.map((row) => (
                  <tr key={row.id}>
                    <td>{row.id}</td>
                    <td><a href={`https://${row.links}`}>{row.links}</a></td>
                    <td>{row.prefix}</td>
                    <td>
                      {/* Multi-select dropdown for select tags */}
                      {/* <select
                  multiple
                  value={selectedTags[row.id] || []}
                  onChange={(e) => handleTagSelect(row.id, Array.from(e.target.selectedOptions, option => option.value))}
                >
                  {row['select tags'].split(',').map((tag) => (
                    <option key={tag.trim()} value={tag.trim()}>
                      {tag.trim()}
                    </option>
                  ))}
                </select> */}
                      <div className={styles.customDropdown}>
                        <div className={styles.selectedOptions} onClick={() => toggleDropdown(row.id)}>
                          <div>Select Tags</div><div><svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10 0.75L5.5 5.25L1 0.75" stroke="#999CA0" stroke-linecap="round" stroke-linejoin="round" />
                          </svg>
                          </div>
                        </div>
                        {dropdownVisible[row.id] && (
                          <ul className={styles.dropdownOptions}>
                            {row['select tags'].split(',').map((tag) => (
                              <li key={tag.trim()} onClick={() => {
                                handleTagSelect(row.id, tag.trim())
                                toggleDropdown(row.id)
                              }} >
                                {tag.trim()}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      {/* <select className={styles.drop}
                      value={selectedTags[row.id] || ''}
                      onChange={(e) => handleTagSelect(row.id, Array.from(e.target.selectedOptions, option => option.value))}
                    >
                      {row['select tags'].split(',').map((tag) => (
                        <option key={tag.trim()} value={tag.trim()}>
                          {tag.trim()}
                        </option>
                      ))}
                    </select> */}
                    </td>
                    <td >
                      <div className={styles.lasttd}>
                        {selectedTags[row.id] && selectedTags[row.id].map((tag) => (
                          <div key={tag} className={styles.selectedTag}>
                            {tag}
                            <div onClick={() => handleTagRemove(row.id, tag)}><svg width="12" height="12" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M1 1L4 4M4 4L1 7M4 4L7 7M4 4L7 1" stroke="white" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            </div>
                          </div>
                        ))}
                      </div>

                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>


      </div>
    </div>
  );
};

export default CSVReaderComponent;
