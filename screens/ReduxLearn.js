import * as React from 'react';
import { Text, View, StyleSheet, Button, ScrollView } from 'react-native';
import { Audio } from 'expo-av';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement, GetProducts, LikeProduct, UnlikeProduct } from '../redux/actions/counts';

export default function ReduxLearn() {
    const dispatch = useDispatch();
    const [products, setProducts] = React.useState([]);
    const counter = useSelector((store) => store.count.count);
    const product = useSelector((state) => state.products);
    const like = useSelector((state) => state.like)
    const unlike = useSelector((state) => state.unlike)

    const [likes, setLikes] = React.useState(0);
    const [unlikes, setUnlikes] = React.useState(0);

    const handleIncrement = () => {
        dispatch(increment());
    };
    
    const handleDecrement = () => {
        dispatch(decrement());
    };

    const handleLike = ()=> {
        dispatch(LikeProduct());
    }
    const handleUnlike = ()=> {
        dispatch(UnlikeProduct());
    }


    React.useEffect(()=> {
        dispatch(GetProducts())
        setProducts(product.products.products)
    }, [])
    console.log("Data 2: ",product);
    return(

    <View style={styles.container}>
        {/* <Button title="Play Sound" onPress={playSound} /> */}

        <Text style={{fontSize: 18}}>New val: {counter}</Text>
        <View style={{flex:0.1, flexDirection: 'row'}}>
            <View>
                <Button title="Increment" onPress={handleIncrement} />
            </View>

            <View>
                <Text>{counter}</Text>
            </View>
            <View>
                <Button title="Decrement" onPress={handleDecrement} />
            </View>
        </View>


        <Text style={{fontSize: 18, fontWeight: '900'}}>Products</Text>
        <View style={{flex:1, flexDirection: 'row'}}>
        <ScrollView style={{ paddingLeft: '2.5%' }}>
            {
                products.map((product, index) => (
                    <>
                        <View key={index} style={{flexDirection: 'column',padding:10, width: '100%', borderRadius: 10, backgroundColor: '#ffe' }}>
                            <Text style={{fontSize: 15, fontWeight: '600',padding:5}}>{product.name}</Text>
                            <View style={{flexDirection: 'row'}} >
                                <Text style={{fontSize: 12, fontWeight: '600',padding:5}}>Likes: {like}</Text>
                                <Text style={{fontSize: 12, fontWeight: '600',padding:5}}>Unlikes: {unlike}</Text>
                            </View>
                            
                            <View style={{flexDirection: 'row'}} >
                                
                                <Button title='Like' onPress={handleLike}/>
                                <Text>        </Text>
                                <Button title='Unlike' onPress={handleUnlike}/>
                            </View>
                        </View>
                    </>
            ))}
        </ScrollView>

        </View>
    </View>
    )


}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 20
    },
  });