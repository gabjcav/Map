import React, { useState, useEffect } from 'react';
import Cosmic from 'cosmicjs'; 
import Container from '../../components/Container';
import PageTitle from '../../components/PageTitle';
import HomeContainer from '../HomeContainer';

const StopListContainer = () => {

    const [pageData, setPageData] = useState(null); 

    useEffect(() => {
        const client = new Cosmic()
        const bucket = client.bucket({
          slug: process.env.BUCKET_SLUG,
          read_key: process.env.READ_KEY
        });
  
        bucket.getObjects({
          type: 'stops',
          props: 'title,slug',
          limit: 5
        })
        .then(data => {
          setPageData(data)
        })
        .catch(error => {
          console.log(error);
        })
      }, []);


      function renderSkeleton() {
        return (
          <p>Loading page....</p>
        );
      }

      function renderPage() {
        return (
          <Container as="main">
              <h2>The 5</h2>
            <ul>
                {pageData.objects.map(item => {
                    return (
                        <li>
                            <a href={`/stop/${item.slug}`}>{item.title}</a>
                        </li>
                    )
                })}
            </ul>
          </Container>
        )
      }
  
      return (
        <>
          {(pageData === null) ? renderSkeleton() : renderPage()}
        </>
      )
}

export default StopListContainer;