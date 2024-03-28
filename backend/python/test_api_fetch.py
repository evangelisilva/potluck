from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from bson.objectid import ObjectId
import certifi
import math
uri = "mongodb+srv://user:user@icsi518-mongodb-cluster.a8atea8.mongodb.net/?retryWrites=true&w=majority&appName=icsi518-mongodb-cluster"
# Create a new client and connect to the server
client = MongoClient(uri, tlsCAFile=certifi.where())
# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    print("now that we've successfully connected - what is the client: ", client)
    ####print(client.potluck.dishrecommendationtests)
except Exception as e:
    print(e)

# Implement functions to calculate ordinal feature list
def ordinalFeatureComputation(entity):
    # Step 1: create a set of if statments to determine the "grade" of the time it takes to make

    # Define the aggregation pipeline
    pipeline = [
        {
            "$group": {
                "_id": None,
                "maxValue": {"$max": "$preparationTime"}  # Replace "columnName" with the actual name of your column/field
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(dishCollection.aggregate(pipeline))

    # Extract the maximum value
    max_value = result[0]["maxValue"]

    print("Maximum value:", max_value)

    ## Same steps for the minimum value
    # Define the aggregation pipeline
    pipeline = [
        {
            "$group": {
                "_id": None,
                "minValue": {"$min": "$preparationTime"}  # Replace "columnName" with the actual name of your column/field
            }
        }
    ]

    # Execute the aggregation pipeline
    result = list(dishCollection.aggregate(pipeline))

    # Extract the maximum value
    min_value = result[0]["minValue"]

    print("Minimum value:", min_value)

    ## Issue: before taking this difference, what actually is the entity?
    print('before taking this difference, what actually is the entity?: ', entity)
    differenceFromMin = entity['preparationTime'] - min_value

    entireRange = max_value - min_value
    
    preparationTimeScore = math.ceil(differenceFromMin/entireRange * 10)

    complexityAndPopularityDict = {"Low" : 1, "Medium" : 2, "High" : 3}
    # Step 2: calculate complexity mapping based on the entity
    complexityScore = complexityAndPopularityDict.get(entity['complexity'])
    # Step 3: calculate popularity mapping based on the entity
    popularityScore = complexityAndPopularityDict.get(entity['popularity'])


    return [preparationTimeScore, complexityScore, popularityScore]

# Also implement functions to do the text comparison
def textComparison(participantDescription, dishIngredients):
    return 0

# Params: the datapoints for the "participant" and "dish", respectively (to be compared)
# return: the score respenting the overall similarity
def calculate_score(dish):
    score = 0

    #** Their way of calculating the score
    # Calculate score based on matching criteria and weighted factors
    ####score += match_theme(participant_preferences, dish) * weight_theme
    ####score += match_dietary_restrictions(participant_preferences, dish) * weight_restrictions
    ####score += match_allergens(participant_preferences, dish) * weight_allergens
    # **

    # my way of calculating the score based on euclidian functions
    ## take points values for: the oridinal values of preparation time, complexity, and populatrity (grouped into a singlepoint)

    participantOrdinalFeatures = ordinalFeatureComputation(user_event_preferences)
    dishOrdinalFeatures = ordinalFeatureComputation(dish)
    score += math.dist(participantOrdinalFeatures, dishOrdinalFeatures)


    ## take nominal values for (can't use euclidian distances)
    ### likely take the inverse (or complement) to account for lower things
    
    ### ingredient text comparison:
    score += (1 - textComparison(user_document['allergens'], dish['ingredients']))
    
    
    # Add more matching criteria and weights as needed
    return score

## Note: we haven't actually filtered these yet
## Helper function for further filtering the dish set - checking for user allergens and event cuisine (to be called in the recommendation algorithm)
def dishSetExtraFilter(document):
    # Comparison to the allergens
    for dishAllergen in document['allergens']:
        for userAllergen in user_document['allergens']:
            # If you have any equality, you know that you can't include this document, so return false
            if (dishAllergen == userAllergen):
                print('In the extra filter allergens section - what is the conflicting allergen?: ', dishAllergen, ", ", userAllergen)
                return False


    # Comparison to the cusines
    # common cusines list (you must have at least one to return true)
    commonCuisinesList = []
    for dishCuisine in document['cuisines']:
        for eventCuisine in event_cuisines:
            # Keep track of the matches
            if (dishCuisine == eventCuisine):
                print("In the extra filter cusines section. Do we ever have a matching cuisine?: ", dishCuisine, ", ", eventCuisine)
                commonCuisinesList.append(dishCuisine)
    if (len(commonCuisinesList) == 0):
        return False
    return True


## Algorithm 
# TODO: if we have a fixed user ID, maybe remove the participant preferences field
def recommend_dishes(dish_set):
    recommended_dishes = []
    for dish in dish_set:
        # before computing the score and appending - check the "extra filter"
        if (dishSetExtraFilter(dish) == False):
            continue
        print('In the recommend_dishes algorithm. Do we ever make it past the extra filter??')
        score = calculate_score(dish)
        # Append all dishes with their scores
        recommended_dishes.append((dish, score))
    recommended_dishes.sort(key=lambda x: x[1], reverse=True)
    # at the end, take the top 3 (if more than 3 exist)
    return recommended_dishes
    if (len(recommended_dishes) <= 3):
        return recommended_dishes
    else:
        return recommended_dishes[0:3]

# Issue when actually asccessing data: do we need to access the database attribute first, or is it already there?

# Select database (replace 'your_database' with your actual database name)
####db = client.icsi518-mongodb-cluster

# Select collection (replace 'your_collection' with your actual collection name)
## Note: since you already are into the cluster ( icsi518-mongodb-cluster), you only need to specify the DATABASE, and the TABLE
dishCollection = client.potluck.dishrecommendationtests

# Query the collection (this example retrieves all documents)
dish_cursor = dishCollection.find({})


# TODO: apply the filters to create available dishes for the client
## recall - for users - we need to get it based on the frontend (hardcode for now)
# But in this section - we will only have ONE USER AT A TIME
user_id = '65d37b9cf608ce904718e317'
userCollection = client.potluck.users
user_cursor = userCollection.find({'_id': ObjectId(user_id)})

# Note: you should break after the first one
user_document = {}
for document in user_cursor:
    print(document)
    user_document = document
    break

print("Test print - for the user cursor - is the first entry a JSON object??: ", type(user_document), user_document)
print("New with accessing an attribute of it: ", user_document['firstName'])

# Course of the meal- we'll have to get from the frontend choice (hardcode for now)
# Available dishes - look up the given dish in the sign-up dataset AS YOU GO ALONG (we are already starting the base dataset)

## Hard coding the cusines and the meal course
event_cuisines = ['American', 'Japanese', 'Thai', 'Italian']
meal_course = "Main course"

## TODO: hardcode the NON-filters - just COMPARISIONS for the loop (complexity, preparation time, popularity)
preferred_preparation_time = 20
user_event_preferences = {"preparationTime" : 60, "complexity" : "Medium", "popularity" : "Medium"}

## Actually APPLY the filters to dish set (theme, dietary restrictions, allergens, course of the meal, dish being available)

# ** Possible new approach - and due to their complexity, dietary allergens can be filtered separately (likely IN THE LOOP BELOW), for each dish , we can check every element in user aallergens and make sure it doesn'yt match any element of the dish allergens (triple-nested for loops)

# To filter out the dish signups, get the list of dish IDS from the dish signup table
dishSignupCollection = client.potluck.dishsignups
dish_signup_list = []
dish_signup_cursor = dishSignupCollection.find({})
for document in dish_signup_cursor:
    dish_signup_list.append(document['dish'])

dish_set = dishCollection.find({'course' : meal_course,
'dietaryRestrictions' : {"$all" : user_document['dietaryRestrictions']}, 
'_id' : {"$nin" : dish_signup_list}})



## Test of the function for the extra filter
####all_dish_cursor = dishCollection.find({})
####control = 0
####for document in all_dish_cursor:
####    if (dishSetExtraFilter(document) == True):
####        print("Dish number: ", control, " SATISIFES the allergen and cuisine requirements, what is it: ", document)
####    if (dishSetExtraFilter(document) == False):
####        print("Dish number: ", control, " doesn't satisfy the allergen and/or cuisine requirements")
####    control = control + 1


print('note: the user dietary restrictions are: ', user_document['dietaryRestrictions'])
print('note: the user allergens are: ', user_document['allergens'])

# Calling of the recommendation algorithm:

dishes_for_user = recommend_dishes(dish_set)

print("What dishes have been recommended to the user?: ")

for dish, score in dishes_for_user:
    # Print out all of the dishes here
    print('\n')
    print(dish)


# Close the connection when done (after calling all the algorithms)
client.close()

#"Closing step" of the algorithm: return the dishes for user when the spawned instance closes
## (store the IDS in a text file by unique user ID)
## *to keep things simple, we can just return the ID of the dish



    

