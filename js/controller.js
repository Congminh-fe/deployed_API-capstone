export let renderItems = (data) => {
    let itemstr = '';

    data.forEach((item) => {
        let {
            id,
            img,
            name,
            price,
            desc,
            type
        } = item;
        let phoneStr = ` <div class="items_wrapper w-full md:w-1/2 lg:w-1/3 p-4">

            <div class="items_w-inner">
                <div class="inner_padding">
                    <div class= "inner_name mt-3">
                    <p>New</p>
                    <h3>${name}</h3></div>
                    <div class="inner_img">
                        <img src=${img} alt="" />
                    </div>
                    <div class="inner_content">
                        
                        <h4>Price:<span class ="price_span"> ${price}$</span> </h4>
                        <div class="flex mb-3 justify-between">
                        <div>
                         <p class = "desc_items">${desc}</p>
                        </div>
                       
                        <div>
                        <button onclick= "addToCart(${id})" class ="btn_buy">Add To Cart</button>
                        </div>
                        
                        </div>
                    </div>
                    

                </div>
            </div>
        </div>`

        itemstr += phoneStr
    })
    document.getElementById("display_items").innerHTML = itemstr


}
