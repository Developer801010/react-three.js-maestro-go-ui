  import React, { useState } from 'react';
  import './App.css';
  import Fuse from 'fuse.js';
  
  import endPoints from './asa-data.json';
  
  function inteliSearch() {
    const [query, updateQuery] = useState('');
  
    const fuse = new Fuse(endPoints, {
      keys: [
        'cisco.asa.source_interface',
        'destination.address',
        'destination.ip',
        'destination.port',
        'event.action',
        'event.code',
        'event.module',
        'event.original',
        'event.type',
        'host.hostname',
        'log.level',
        'log.offset',
        'network.community_id',
        'network.iana_number',
        'network.transport',
        'process.name',
        'process.pid',
        'service.type',
        'source.address',
        'source.ip',
        'source.port'  
      ],
      includeScore: true
    });
  
    const results = fuse.search(query);
    const endPointResults = query ? results.map(endPoint => endPoint.item) : endPoints;
  
    function onSearch({ currentTarget }) {
      updateQuery(currentTarget.value);
    }
  
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="container">
            <h1>End Point Information</h1>
          </div>
        </header>
        <main className="container">
          <ul className="endPoints">
            {endPointResults.map(endPoint => {
              const { destination.address, destination.ip, destination.port, host.hostname, log.level, log.offset, network.community_id, network.iana_number, network.transport, process.name, process.pid, service.type, source.address, source.ip, source.port } = endPoint;
              return (
                <li className="endPoint"> { host.hostname }
                  <ul className="endPoint-meta">
                    <li><strong>Label</strong> { destination.address } </li>
                    <li><strong>Label</strong> { destination.ip } </li>
                    <li><strong>Label</strong> { destination.port } </li>
                    <li><strong>Label</strong> { host.hostname } </li>
                    <li><strong>Label</strong> { log.level } </li>
                    <li><strong>Label</strong> { log.offset } </li>
                    <li><strong>Label</strong> { network.community_id } </li>
                    <li><strong>Label</strong> { network.iana_number } </li>
                    <li><strong>Label</strong> { network.transport } </li>
                    <li><strong>Label</strong> { process.name } </li>
                    <li><strong>Label</strong> { service.type } </li>
                    <li><strong>Label</strong> { source.address } </li>
                    <li><strong>Label</strong> { source.ip } </li>
                    <li><strong>Label</strong> { source.port } </li>
                  </ul>
                </li>
              )
            })}
          </ul>
          <aside>
            <form className="search">
              <label>Search</label>
              <input type="text" />
              <input type="text" value={query} onChange={onSearch} />
            </form>
          </aside>
        </main>
        <footer>
          <div className="container">
            <p>
                Graph...
            </p>
          </div>
        </footer>
      </React.Fragment>
    );
  }
  export default InteliSearch;


