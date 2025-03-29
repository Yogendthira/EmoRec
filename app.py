from flask import Flask, request, jsonify, render_template, send_file
import google.generativeai as genai
import os
import traceback
from flask_cors import CORS

app = Flask(__name__, static_folder='static', static_url_path='/static')
CORS(app)

# Configure Gemini API with Google AI Studio key
DEFAULT_API_KEY = 'AIzaSyCtZ1tsdSIxtICVEBf6Kh69BVTHb2rxCks'  # Default key for development
API_KEY = os.environ.get('GEMINI_API_KEY', DEFAULT_API_KEY)
print(f"Using API key: {API_KEY[:5]}...{API_KEY[-4:]}")
genai.configure(api_key=API_KEY)

@app.route('/')
def index():
    return render_template('Emorec.html')

@app.route('/Emorec.html')
def emorec_direct():
    return render_template('Emorec.html')

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        data = request.json
        user_input = data.get('message', '')
        
        print(f"Received user input: {user_input}")
        
        if not user_input:
            return jsonify({'error': 'Empty message'}), 400
        
        # Direct API call without model discovery
        try:
            # The more direct approach using generation_config parameters
            generation_config = {
                "temperature": 0.9,
                "top_p": 1,
                "top_k": 1,
                "max_output_tokens": 2048,
            }
            
            safety_settings = [
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
            
            model = genai.GenerativeModel(
                model_name="gemini-pro",
                generation_config=generation_config,
                safety_settings=safety_settings
            )
            
            print("Sending request to Gemini API...")
            response = model.generate_content(user_input)
            
            if hasattr(response, 'text'):
                result_text = response.text
            else:
                # Handle alternative response formats
                result_text = str(response)
                
            print(f"Response received")
            
        except Exception as api_error:
            print(f"Gemini API error: {str(api_error)}")
            # Return a more user-friendly message
            return jsonify({'error': 'Could not connect to AI service. Please check your API key or try again later.'}), 500
        
        # Return the result
        if result_text:
            print(f"Valid response received")
            return jsonify({
                'message': result_text
            })
        else:
            print("Empty response from Gemini API")
            return jsonify({'error': 'The AI did not generate a response. Please try again.'}), 500
            
    except Exception as e:
        print(f"Error in API call: {str(e)}")
        traceback.print_exc()  # Print full traceback for debugging
        return jsonify({'error': 'An unexpected error occurred. Please try again.'}), 500

@app.route('/test')
def test():
    return send_file('test.html')

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    print(f"Server running at http://localhost:{port}")
    app.run(host='0.0.0.0', port=port, debug=True) 