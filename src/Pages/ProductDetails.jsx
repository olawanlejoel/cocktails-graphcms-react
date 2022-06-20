import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { request } from 'graphql-request';

const ProductDetails = () => {
	const [product, setProduct] = useState([]);
	const navigate = useNavigate();
	const { slug } = useParams();

	useEffect(() => {
		const fetchProduct = async () => {
			const { cocktail } = await request(
				'https://api-us-east-1.graphcms.com/v2/cl4ji8xe34tjp01yrexjifxnw/master',
				`
			{ 
				cocktail(where: {slug: "${slug}"}) {
					category
					info
					ingredients
					instructions
					image {
						url
					 }
					name
					
				 }
			}
		 `
			);

			setProduct(cocktail);
		};

		fetchProduct();
	}, [slug]);

	return (
		<div className="container">
			<button className="btn" onClick={() => navigate(-1)}>
				Go Back
			</button>
			<div>
				<div className="title">
					<h1>{product.name}</h1>
				</div>
				<div className="flex-container">
					{product.image && (
						<img src={product.image.url} alt="" className="cocktail-img" />
					)}
					<div className="cocktail-infos">
						<div className="row">
							<h3 className="label">Name: </h3>
							<p className="text">{product.name}</p>
						</div>
						<div className="row">
							<h3 className="label">Category: </h3>
							<p className="text">{product.category}</p>
						</div>
						<div className="row">
							<h3 className="label">Info: </h3>
							<p className="text">{product.info}</p>
						</div>
						<div className="row">
							<h3 className="label">Instructions: </h3>
							<p className="text">{product.instructions}</p>
						</div>
						<div className="row">
							<h3 className="label">Ingredients: </h3>
							<p className="text">{product.ingredients}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
